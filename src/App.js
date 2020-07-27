import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import home from './pages/home'
import signup from './pages/signup'
import login from './pages/Login/login'
import Navbar from './components/Navbar'
import jwtDecode from 'jwt-decode'
import AuthRoute from './utils/AuthRoute'
import store from './redux/store'
import { Provider } from 'react-redux'
import { getAuthenUserDetails, logoutUser } from './redux/actions/userAction'
import { SET_AUTHENTICATED } from './redux/types'
import AxiosService from './utils/AxiosService'

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    AxiosService.authorize(token)
    store.dispatch(getAuthenUserDetails())
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={home} />
              <AuthRoute
                exact path='/signup' component={signup} />
              <AuthRoute
                exact path='/login' component={login} />
              {/* ***history 2 */}
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
