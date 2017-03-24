import React from 'react'
import ReactDOM from 'react-dom'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import Store from './reducers'
import App from './containers/App'

const history = createHistory()
const ReduxRouterMiddleware = routerMiddleware(history)

const loggerMiddleware = createLogger()
const middlewares = [
    ReduxRouterMiddleware,
    ReduxThunk,
    loggerMiddleware,
]

injectTapEventPlugin();
if (module.hot) {
    module.hot.accept()
}


let store = createStore(
    Store,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
)

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history} >
            <Route name='index' path='/' component={App}>
                {/*<Route name='postList' path='posts' component={PostList} />
                <Route name='post' path='/posts/:id' component={Post} />*/}
            </Route>
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));