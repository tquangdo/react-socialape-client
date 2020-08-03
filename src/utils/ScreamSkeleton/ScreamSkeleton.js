import { Card, CardContent, CardMedia, withStyles } from '@material-ui/core'
import React, { Fragment } from 'react'
import NoImg from '../../images/no-img.png'
import skeletonStyle from './ScreamSkeletonStyle'

const ScreamSkeleton = props => {
    const { classes } = props

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

export default withStyles(skeletonStyle)(ScreamSkeleton)