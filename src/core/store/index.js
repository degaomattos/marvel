import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import reducers from '../store/reducers'
import sagas from '../store/sagas'

const middlewares = []

const browserHistory = createBrowserHistory({})

middlewares.push(routerMiddleware(browserHistory))
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)
// add support for Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(reducers, middleware)
//const history: any = syncHistoryWithStore(browserHistory, store)

sagaMiddleware.run(sagas)

export { store }