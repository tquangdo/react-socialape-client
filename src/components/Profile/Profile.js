import { Button, Paper, Typography, withStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser, uploadImage } from '../../redux/actions/userAction'
import MyButton from '../../utils/MyButton'
import EditDetails from '../EditDetails'
import StaticProfile from '../StaticProfile/StaticProfile'
import profileStyle from './ProfileStyle'
import ProfileSkeleton from '../../utils/ProfileSkeleton/ProfileSkeleton'

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
                credentials, loading, authenticated,
            }
        } = this.props
        let profileMarkup = (!loading) ? (
            authenticated ? (
                <Fragment>
                    < input type='file' id='imageInput'
                        hidden='hidden' onChange={this.handleImageChange} />
                    <MyButton tip='Đổi avatar'
                        onClick={this.handleEditPicture} btnClassName={classes.button}>
                        <EditIcon color='primary' />
                    </MyButton>
                    <StaticProfile profile={credentials} />
                    <MyButton tip='Logout'
                        onClick={this.handleLogout} btnClassName='button'>
                        <KeyboardReturn color='primary' />
                    </MyButton>
                    <EditDetails />
                </Fragment>
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
                )) : (<ProfileSkeleton />)
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