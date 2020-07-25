import { Grid, Typography, withStyles } from '@material-ui/core'
import dayjs from 'dayjs'
import React, { Component, Fragment } from 'react'
import cmtsStyle from './CommentsStyle'
import { Link } from 'react-router-dom'

class Comments extends Component {
    render() {
        const {
            classes, comments
        } = this.props
        return (
            <Grid container>
                {comments.map((cmt, index) => {
                    const { body, createdAt, userImage, userHandle } = cmt
                    return (
                        <Fragment key={index}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                            src={userImage}
                                            title='Ảnh avatar'
                                            alt='comment'
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant='h5'
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color='primary'
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography variant='body2' color='textSecondary'>
                                                {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variabnt='body1'>{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                < hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

export default withStyles(cmtsStyle)(Comments)