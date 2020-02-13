import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const initializeStore = (state = {}) => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}
