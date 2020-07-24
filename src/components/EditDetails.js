import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addUserDetails } from '../redux/actions/userAction'
import MyButton from '../utils/MyButton'
import profileStyle from './Profile/ProfileStyle'

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    componentDidMount() {
        this.mapUserDetailsToState(this.props.credentials)
    }
    mapUserDetailsToState = credentials => {
        const { bio, website, location } = credentials
        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : '',
        })
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = () => {
        const { bio, website, location } = this.state
        if (bio === '' && website === '' && location === '') {
            alert('KO được để trống all thông tin!!!')
            return
        }
        const userDetails = {
            bio: bio,
            website: website,
            location: location,
        }
        this.props.addUserDetails(userDetails)
        this.handleClose()
    }
    render() {
        const { classes } = this.props
        const { open, bio, website, location } = this.state
        return (
            <Fragment>
                <MyButton tip='Sửa chi tiết profile'
                    onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary' />
                </MyButton>
                {/* Vì xài <Dialog open={}/> nên phải dùng state={open} */}
                <Dialog open={open} onClose={this.handleClose}
                    fullWidth maxWidth='sm'>
                    <DialogTitle>Sửa profile</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Sơ lược"
                                multiline
                                rows="3"
                                placeholder="Giới thiệu vắn tắt bản thân"
                                value={bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Website của bạn"
                                value={website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="location"
                                type="text"
                                label="Nơi chốn"
                                placeholder="Bạn sống ở đâu?"
                                value={location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapState2Props = state => ({
    credentials: state.userReducer.credentials
})
const mapActionsToProps = { addUserDetails }

export default connect(
    mapState2Props, mapActionsToProps
)(withStyles(profileStyle)(EditDetails))