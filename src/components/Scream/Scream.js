import React, { Component } from 'react'
import { withStyles, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import screamStyle from './ScreamStyle'
import { Link } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { connect } from 'react-redux'
import ChatIcon from '@material-ui/icons/Chat'
import MyButton from '../../utils/MyButton'
import DeleteScream from '../DeleteScream/DeleteScream'
import ScreamDLG from '../ScreamDLG/ScreamDLG'
import LikeButton from '../LikeButton'

class Scream extends Component {
    render() {
        dayjs.locale('vi')
        dayjs.extend(relativeTime)
        const {
            classes,
            scream: {
                screamId,
                body,
                userHandle,
                userImage,
                createdAt,
                likeCount,
                commentCount,
            },
            user: { authenticated, credentials: { handle } },
        } = this.props
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null
        return (
            <Card className={classes.card} >
                <CardMedia className={classes.image} image={userImage} title='Ảnh avatar' />
                <CardContent className={classes.content}>
                    <Typography variant='h5' component={Link}
                        to={`/users/${userHandle}`} color='primary'
                    >
                        {userHandle} </Typography>
                    {deleteButton}
                    <Typography variant='body2' color='textSecondary' >
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant='body1' >{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Thích</span>
                    <MyButton tip='Bình luận'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} Bình luận</span>
                    <ScreamDLG screamId={screamId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.userReducer,
})

export default connect(mapStateToProps)(withStyles(screamStyle)(Scream))
