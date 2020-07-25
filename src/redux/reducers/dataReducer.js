import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM } from '../types'

const initialState = {
    screams: [],
    scream: {},
    loading: false,
}

const dataReducer = (state = initialState, action) => {
    let index = -1
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false,
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams,
                ]
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = state.screams.findIndex(
                //scream.screamId là screamId trong list scream of DB
                //action.payload.screamId là screamId đối tượng unlike
                scream => scream.screamId === action.payload.screamId
            )
            state.screams[index] = action.payload
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload //gán nguyên object thì KO dùng destructuring
            }
            return { ...state }
        case DELETE_SCREAM:
            index = state.screams.findIndex(
                scream => scream.screamId === action.payload
            )
            state.screams.splice(index, 1)
            return { ...state }
        default:
            return state
    }
}

export default dataReducer