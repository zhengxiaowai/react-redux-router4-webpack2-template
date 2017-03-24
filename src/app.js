import React from 'react'
import ReactDOM from 'react-dom'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import { Route, Router, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { syncHistoryWithStore } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import Store from './reducers'
import App from './containers/App'

const loggerMiddleware = createLogger()
const middlewares = [
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

const history = syncHistoryWithStore(hashHistory, store)
const Root = () => (
    <Provider store={store}>
        <Router history={history} >
            <Route name='index' path='/' component={App}>
                {/*<Route name='postList' path='posts' component={PostList} />
                <Route name='post' path='/posts/:id' component={Post} />*/}
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));