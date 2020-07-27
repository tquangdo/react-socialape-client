import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../types'

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
        case SUBMIT_COMMENT:
            index = state.screams.findIndex(
                scream => scream.screamId === action.payload.screamId //action.payload là info of cmt's user, NOT post's user
                // -> click "Like/Unlike" KO thể reflect ngược lại Scream.js
            )
            state.screams[index].commentCount++
            state.scream.commentCount++
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [
                        // add 'action.payload' vào đầu mảng 'comments[]'
                        action.payload, ...state.scream.comments
                    ]
                }
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            const { screamId, body, userHandle, userImage, createdAt, likeCount, commentCount } = action.payload
            index = state.screams.findIndex(
                //scream.screamId là screamId trong list scream of DB
                //action.payload.screamId là screamId đối tượng unlike
                scream => scream.screamId === screamId
            )
            state.screams[index] = action.payload //action.payload là info of post's user
            // -> click "Like/Unlike" có thể reflect ngược lại Scream.js
            if (state.scream.screamId === screamId) {
                state.scream.body = body //nếu gán nguyên object thì KO dùng destructuring
                state.scream.userHandle = userHandle
                state.scream.userImage = userImage
                state.scream.createdAt = createdAt
                state.scream.likeCount = likeCount
                state.scream.commentCount = commentCount
            }
            return {
                ...state,
            }
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