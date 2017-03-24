import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const Store = combineReducers({
    routing: routerReducer,
})

export default Store 