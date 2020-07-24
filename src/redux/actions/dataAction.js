import AxiosService from '../../utils/AxiosService'
import { LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM } from '../types'

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

