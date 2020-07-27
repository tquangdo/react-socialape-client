import AxiosService from '../../utils/AxiosService'
import { LOADING_UI, SET_USER, CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED, LOADING_USER } from '../types'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    AxiosService.post('/login', userData)
        .then(res => {
            setAuthorizeHeader(res.data.token)
            dispatch(getAuthenUserDetails())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/') //***history 4
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            })
        })

}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    AxiosService.post('/signup', newUserData)
        .then(res => {
            setAuthorizeHeader(res.data.tokenVar)
            dispatch(getAuthenUserDetails())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch(err => {
            // alert('API ERR!! ' + JSON.stringify(err.response.data))
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            })
        })

}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    AxiosService.delAutho()
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const getAuthenUserDetails = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    AxiosService.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data,
            })
        })
        .catch(err => console.log(err))
}

export const addUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    AxiosService.post('/user', userDetails)
        .then(() => {
            dispatch(getAuthenUserDetails())
        })
        .catch(err => console.log(err))
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    AxiosService.post('/user/image', formData)
        .then(() => {
            dispatch(getAuthenUserDetails())
        })
        .catch(err => console.log(err))
}

const setAuthorizeHeader = token => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    AxiosService.authorize(FBIdToken)
}