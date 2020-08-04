import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types'
import { hienMsgError } from '../../utils/ToastHelper'

const initialState = {
    loading: false,
    errors: null,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            hienMsgError(action.payload)
            return {
                ...state,
                loading: false,
                errors: action.payload,
            }
        case CLEAR_ERRORS:
            return initialState
        case LOADING_UI:
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default uiReducer