import { createStore, compose, applyMiddleware } from 'redux'
import myReducer from './reducers/Reducer'
import thunk from 'redux-thunk'

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
    }) : compose

const enhancers = [applyMiddleware(thunk)]
const storeReducer = createStore(
    myReducer,
    composeEnhancers(...enhancers)
)
export default storeReducer