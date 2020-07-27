import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest} //***history 1
        render={props =>
            authenticated ? <Redirect to='/' /> : <Component {...props} />
        }
    />
)
const mapState2Props = state => ({
    authenticated: state.userReducer.authenticated,
})

export default connect(mapState2Props)(AuthRoute)