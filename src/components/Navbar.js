import React, { Component } from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className='nav-container' >
                    <Button color='inherit' component={Link} to='/login' >ĐăngNhập</Button>
                    <Button color='inherit' component={Link} to='/' >TrangChủ</Button>
                    <Button color='inherit' component={Link} to='/signup' >ĐăngKíMember</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar