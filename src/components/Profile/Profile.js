import { Button, Paper, Typography, withStyles } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import LinkIcon from '@material-ui/icons/Link'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import dayjs from 'dayjs'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser, uploadImage } from '../../redux/actions/userAction'
import MyButton from '../../utils/MyButton'
import EditDetails from '../EditDetails'
import profileStyle from './ProfileStyle'

class Profile extends Component {
    handleImageChange = event => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    handleLogout = () => {
        this.props.logoutUser()
    }
    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location,
                },
                loading, authenticated,
            }
        } = this.props
        let profileMarkup = (!loading) ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className='image-wrapper'>
                            <img src={imageUrl} alt='profile' className='profile-image' />
                            {/* upload image */}
                            <input type='file' id='imageInput'
                                hidden='hidden' onChange={this.handleImageChange} />
                            <MyButton tip='Đổi avatar'
                                onClick={this.handleEditPicture} btnClassName='button'>
                                <EditIcon color='primary' />
                            </MyButton>
                        </div>
                        <div className='profile-details'>
                            <MuiLink component={Link} to={`/users/${handle}`}
                                color='primary' variant='h5'>
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant='body2'>
                                {bio}
                            </Typography>}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color='primary' /><span>{location}</span>
                                    <hr />
                                </Fragment>)}
                            {website && (
                                <Fragment>
                                    <LinkIcon color='primary' />
                                    <a href={website} target='_blank' rel='noopener noreferrer' >
                                        {' '}{website}
                                    </a>
                                    <hr />
                                </Fragment>)}
                            <CalendarToday color='primary' />{' '}
                            <span>Gia nhập từ: {dayjs(createdAt).format('MMMM YYYY')}</span>
                        </div>
                        <MyButton tip='Logout'
                            onClick={this.handleLogout} btnClassName='button'>
                            <KeyboardReturn color='primary' />
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                    <Paper className={classes.paper}>
                        <Typography variant="body2" align="center">
                            KO tìm thấy profile, xin hãy login lại!
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/signup"
                            >
                                Signup
                            </Button>
                        </div>
                    </Paper>
                )) : (<p>Đang load dữ liệu...</p>)
        return profileMarkup
    }
}
const mapState2Props = state => ({
    user: state.userReducer
})
const mapActionsToProps = { logoutUser, uploadImage }

export default connect(
    mapState2Props, mapActionsToProps
)(withStyles(profileStyle)(Profile))