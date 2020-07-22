import React, { Component } from 'react'
import { withStyles, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import screamStyle from './ScreamStyle'
import { Link } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

class Scream extends Component {
    render() {
        dayjs.locale('vi')
        dayjs.extend(relativeTime)
        const {
            classes,
            scream: {
                body,
                userHandle,
                userImage,
                createdAt,
                // likeCount,
                // commentCount,
            }
        } = this.props
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
                    <Typography variant='body1' >{body} </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(screamStyle)(Scream)