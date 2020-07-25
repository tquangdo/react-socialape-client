import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { clearErrors, post1Scream } from '../../redux/actions/dataAction'
import MyButton from '../../utils/MyButton'
import postScreamStyle from './PostScreamStyle'

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {},
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { errors, loading } = nextProps.UI
        if (errors) {
            this.setState({
                errors: errors
            })
        }
        if (!errors && !loading) {
            this.setState({ body: '', open: false, errors: {}, })
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false, errors: {}, })
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = event => {
        event.preventDefault()
        this.props.post1Scream({ body: this.state.body })
    }
    render() {
        const { classes, UI: { loading } } = this.props
        const { errors, open, body } = this.state
        return (
            <Fragment>
                <MyButton tip='Tạo 1 post' onClick={this.handleOpen}>
                    <AddIcon color='primary' />
                </MyButton>
                <Dialog open={open}
                    onClose={this.handleClose}
                    fullWidth maxWidth='sm'>
                    <MyButton tip='Đóng' onClick={this.handleClose}
                        btnClassName={classes.closeButton} >
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Tạo 1 post mới
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                value={body}
                                name='body'
                                type='text'
                                label='Post!'
                                multiline
                                rows='3'
                                placeholder='Hãy viết 1 post của bạn'
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Đăng
                                {loading && (
                                    <CircularProgress
                                        size={30}
                                        className={classes.progressSpinner}
                                    />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    UI: state.uiReducer
})
const mapActionToProps = {
    post1Scream,
    clearErrors,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(postScreamStyle)(PostScream))
