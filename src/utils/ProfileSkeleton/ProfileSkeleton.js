import { Paper, withStyles } from '@material-ui/core'
import CalendarToday from '@material-ui/icons/CalendarToday'
import LinkIcon from '@material-ui/icons/Link'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import React from 'react'
import NoImg from '../../images/no-img.png'
import profileSkeStyle from './ProfileSkeletonStyle'
import profileStyle from '../../components/Profile/ProfileStyle'

const ProfileSkeleton = (props) => {
    const { classes } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color="primary" /> <span>Location</span>
                    <hr />
                    <LinkIcon color="primary" /> https://website.com
          <hr />
                    <CalendarToday color="primary" /> Joined date
        </div>
            </div>
        </Paper>
    )
}

export default withStyles(profileStyle, profileSkeStyle)(ProfileSkeleton)