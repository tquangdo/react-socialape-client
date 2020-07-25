import { AppBar, Button, Toolbar } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MyButton from '../utils/MyButton'
import PostScream from './PostScream/PostScream'

class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container' >
                    {authenticated ? (
                        <Fragment>
                            <PostScream />
                            <Link to='/'>
                                <MyButton tip='Home' >
                                    <HomeIcon color='primary' />
                                </MyButton>
                            </Link>
                            <MyButton tip='Notifications' >
                                <Notifications color='primary' />
                            </MyButton>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color='inherit' component={Link} to='/login' >ĐăngNhập</Button>
                                <Button color='inherit' component={Link} to='/' >TrangChủ</Button>
                                <Button color='inherit' component={Link} to='/signup' >ĐăngKíMember</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}
const mapStateToProps = (state) => ({
    authenticated: state.userReducer.authenticated
})

export default connect(mapStateToProps)(Navbar)
