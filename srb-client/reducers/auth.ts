import { _Error, match, typeIs } from 'srb-shared'
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADING
} from '@/actions'


const initialState: AuthState = {
  name: null,
  email: null,
  isLoading: false,
  token: null
}


export default (state = initialState, action: AuthAction) => {
  return match(action.type)
    .when(typeIs(USER_LOADING),() => loadingState(state))
    .when(typeIs(
      USER_LOADED,
      REGISTER_SUCCESS,
      LOGIN_SUCCESS
    ), () => loadUser(state, action.payload as PayloadOnSuccess))
    .when(typeIs(
      LOGIN_FAILED,
      REGISTER_FAILED,
      LOGOUT_SUCCESS
    ), () => cleanState())
    .otherwise(state)
}


const loadUser = (state, { email, name, token = null }) => {
  if (token) {
    localStorage.setItem('auth-token', token)
  }

  return {
    ...state,
    isLoading: false,
    email,
    name,
    token: token || state.token
  }
}


const cleanState = () => {
  localStorage.removeItem('auth-token')

  return {
    ...initialState,
    token: null
  }
}


const loadingState = (state) => ({
  ...state,
  isLoading: true
})


export type AuthState = {
  name: string
  email: string
  isLoading: boolean
  token: string
}

export type AuthAction = {
  type: string,
  payload: PayloadOnSuccess | PayloadOnError
}

type PayloadOnSuccess = {
  email: string
  name: string
  token: string
}

type PayloadOnError = {
  error: _Error
}
