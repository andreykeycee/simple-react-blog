import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export const initializeStore = (state = {}) => {
  return createStore(rootReducer, applyMiddleware(thunk))
}