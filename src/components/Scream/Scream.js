import React, { Component } from 'react'
import { withStyles, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import screamStyle from './ScreamStyle'
import { Link } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { connect } from 'react-redux'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { likeScream, unlikeScream } from '../../redux/actions/dataAction'
import MyButton from '../../utils/MyButton'

class Scream extends Component {
    likedScream = () => {
        const { user, scream } = this.props
        const { likes } = user
        if (likes && likes.find(
            like => like.screamId === scream.screamId
        )) {
            return true
        } else {
            return false
        }
    }
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }
    render() {
        dayjs.locale('vi')
        dayjs.extend(relativeTime)
        const {
            classes,
            scream: {
                // screamId,
                body,
                userHandle,
                userImage,
                createdAt,
                likeCount,
                commentCount,
            },
            user: { authenticated },
        } = this.props
        const likeButton = !authenticated ? (
            <MyButton tip='Thích'>
                <Link to='login'>
                    <FavoriteBorder color='primary' />
                </Link>
            </MyButton>
        ) : (
                this.likedScream() ? (
                    <MyButton tip='KO thích' onClick={this.unlikeScream} >
                        <FavoriteIcon color='primary' />
                    </MyButton>
                ) : (
                        <MyButton tip='Thích' onClick={this.likeScream} >
                            <FavoriteBorder color='primary' />
                        </MyButton>
                    )
            )
        return (
            <Card className={classes.card} >
                <CardMedia className={classes.image} image={userImage} title='Profile image' />
                <CardContent className={classes.content}>
                    <Typography variant='h5' component={Link}
                        to={`/users/${userHandle}`} color='primary'
                    >
                        {userHandle} </Typography>
                    <Typography variant='body2' color='textSecondary' >
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant='body1' >{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Thích</span>
                    <MyButton tip='Bình luận'>
                        <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} Bình luận</span>
                </CardContent>
            </Card>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.userReducer,
})
const mapActionToProps = {
    likeScream, unlikeScream
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(screamStyle)(Scream))
