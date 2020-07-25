import AxiosService from '../../utils/AxiosService'
import { LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, POST_SCREAM, CLEAR_ERRORS, SET_ERRORS, SET_SCREAM, STOP_LOADING_UI } from '../types'

export const likeScream = (screamId) => (dispatch) => {
    AxiosService.get(`/screams/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const unlikeScream = (screamId) => (dispatch) => {
    AxiosService.get(`/screams/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAllScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    AxiosService.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_SCREAMS,
                payload: [],
            })
        })
}

export const get1Scream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    AxiosService.get(`/screams/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data,
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => {
            console.log(err)
        })
}

export const post1Scream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    AxiosService.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data,
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            })
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

export const deleteScream = screamId => (dispatch) => {
    AxiosService.delete(`/screams/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId,
            })
        })
        .catch(err => {
            console.log(err)
        })
}


