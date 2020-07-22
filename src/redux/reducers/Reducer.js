import { combineReducers } from 'redux'
import userReducer from './userReducer'
import uiReducer from './uiReducer'
import dataReducer from './dataReducer'

var myReducer = combineReducers({
    userReducer,
    uiReducer,
    dataReducer,
})

export default myReducer
