import React, { Component } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { Link } from 'react-router-dom'
import MyButton from '../utils/MyButton'
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataAction'

class LikeButton extends Component {
    likedScream = () => {
        const { user, screamId } = this.props
        const { likes } = user
        if (likes && likes.find(
            like => like.screamId === screamId
        )) {
            return true
        } else {
            return false
        }
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }
    render() {
        const { authenticated } = this.props.user
        const likeButton = !authenticated ? (
            <Link to='login'>
                <MyButton tip='Thích'>
                    <FavoriteBorder color='primary' />
                </MyButton>
            </Link>
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
        return likeButton
    }
}
const mapStateToProps = (state) => ({
    user: state.userReducer
})
const mapActionToProps = {
    likeScream, unlikeScream
}

export default connect(mapStateToProps, mapActionToProps)(LikeButton)
