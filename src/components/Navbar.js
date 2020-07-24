import React, { Component, Fragment } from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MyButton from '../utils/MyButton'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import Notifications from '@material-ui/icons/Notifications'

class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container' >
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip='Hãy tạo 1 status!' >
                                <AddIcon color='primary' />
                            </MyButton>
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
