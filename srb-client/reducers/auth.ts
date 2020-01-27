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
  token: localStorage.getItem('auth-token')
}


export default (state = initialState, action: AuthAction) => {
  return match(action.type)
    .when(typeIs(USER_LOADING),() => loadingState(state))
    .when(typeIs(
      USER_LOADED,
      REGISTER_SUCCESS,
      LOGIN_SUCCESS
    ), () => loadUser(state, action.payload))
    .when(typeIs(
      LOGIN_FAILED,
      REGISTER_FAILED,
      LOGOUT_SUCCESS
    ), () => cleanState())
}


const loadUser = (state, { email, name, token }) => {
  localStorage.setItem('auth-token', token)

  return {
    ...state,
    isLoading: false,
    email,
    name,
    token
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


type AuthState = {
  name: string
  email: string
  isLoading: boolean
  token: string
}

type AuthAction = {
  type: string,
  payload: {
    email: string
    name: string
    token: string
    error: _Error
  }
}