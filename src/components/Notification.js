import { Badge, IconButton, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { markNotifiRead } from '../redux/actions/userAction'

class Notification extends Component {
    state = {
        anchorEl: null,
    }
    handleOpen = event => {
        this.setState({ anchorEl: event.target })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    onMenuOpened = () => {
        const { notifications, markNotifiRead } = this.props
        let unreadNotifi = notifications
            .filter(notifi => !notifi.read)
            .map(notifi => notifi.notificationId)
        if (unreadNotifi && unreadNotifi.length > 0) {
            markNotifiRead(unreadNotifi)
        }
    }
    render() {
        const { notifications } = this.props
        const { anchorEl } = this.state
        dayjs.extend(relativeTime)
        let notifiIcon
        const notifiBool = notifications && notifications.length > 0
        const notifiLength = (notifications.filter(notifi => notifi.read === false).length)
        if (notifiBool) {
            (notifiLength > 0)
                ? (notifiIcon = (
                    <Badge badgeContent={notifiLength}
                        color='secondary'>
                        <NotificationsIcon />
                    </Badge>
                )) : (
                    notifiIcon = <NotificationsIcon />
                )
        } else {
            notifiIcon = <NotificationsIcon />
        }
        let notifiMarkup = notifiBool ? (
            notifications.map(notifi => {
                const verb = (notifi.type === 'like') ? 'thích' : 'bình luận'
                const time = dayjs(notifi.createdAt).fromNow()
                const iconColor = (notifi.read) ? 'primary' : 'secondary'
                const icon = (notifi.type === 'like') ? (
                    <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                    )
                return (
                    <MenuItem key={notifi.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="initial"
                            variant="body1"
                            to={`/users/${notifi.recipient}/screams/${notifi.screamId}`}
                        >
                            {notifi.sender} đã {verb} post của bạn {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
                <MenuItem onClick={this.handleClose}>
                    Bạn chưa có thông báo nào!
                </MenuItem>
            )
        return (
            <Fragment>
                <Tooltip placement='top' title='Thông báo' >
                    <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notifiIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notifiMarkup}
                </Menu>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    notifications: state.userReducer.notifications
})
const mapActionToProps = {
    markNotifiRead
}

export default connect(mapStateToProps, mapActionToProps)(Notification)
