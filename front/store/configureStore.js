import { createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers' 
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const loggerMiddleWare = ({ dispatch, getState }) => (next) => (action) => {
    console.log(action);
    return next(action);
}

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleWare];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer);
    store.dispatch({type: 'CHANGE_NICKNAME', data:'JAKE'})
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

const wrapper = createWrapper(configureStore, {debug: process.env.NODE_ENV === 'development'})

export default wrapper