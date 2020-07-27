import { CircularProgress, Dialog, DialogContent, Grid, Typography, withStyles } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import dayjs from 'dayjs'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearErrors, get1Scream } from '../../redux/actions/dataAction'
import MyButton from '../../utils/MyButton'
import LikeButton from '../LikeButton'
import screamDLGStyle from './ScreamDLGStyle'
import Comments from '../Comments/Comments'
import CommentForm from '../CommentForm'

class ScreamDLG extends Component {
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.get1Scream(this.props.screamIdFromScreamJS)
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({ open: false, })
        this.props.updateCmtCnt(this.props.screamIdFromScreamJS, this.props.scream.commentCount)
    }
    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                userHandle,
                userImage,
                createdAt,
                commentCount,
                comments,
            },
            UI: { loading }
        } = this.props
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} />
            </div>
        ) : (
                <Grid container>
                    <Grid item sm={5}>
                        <img src={userImage} title='Ảnh avatar' alt='profile' className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography component={Link} color='primary'
                            variant='h5' to={`/users/${userHandle}`} >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{body}</Typography>
                        <LikeButton screamId={screamId} />
                        <span>{this.props.likeCount} Thích</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} Bình luận</span>
                    </Grid>
                    <hr className={classes.visibleSeparator} />
                    <CommentForm screamId={screamId} />
                    <Comments comments={comments} />
                </Grid>
            )
        const { open } = this.state
        return (
            <Fragment>
                <MyButton tip='Mở xem post' onClick={this.handleOpen} btnClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog open={open}
                    onClose={this.handleClose}
                    fullWidth maxWidth='sm'>
                    <MyButton tip='Đóng' onClick={this.handleClose}
                        btnClassName={classes.closeButton} >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    scream: state.dataReducer.scream,
    UI: state.uiReducer,
})
const mapActionToProps = {
    get1Scream, clearErrors,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(screamDLGStyle)(ScreamDLG))
