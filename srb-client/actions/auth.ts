import {
  GET_ERRORS,
  LOGIN_FAILED,
  LOGIN_SUCCESS, LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADING
} from '@/actions/actionTypes'
import { loginUser, registerUser } from '@/helpers/apollo/auth'

export const register = (registerData) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  const registerResult = await registerUser(registerData)

  const hasErrors: boolean = !!(registerResult.error)

  if (hasErrors) {
    dispatch({ type: REGISTER_FAILED })

    dispatch({
      type: GET_ERRORS,
      payload: registerResult.error
    })
  } else {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        ...registerResult.user,
        token: registerResult.token
      }
    })
  }
}


export const login = (loginData) => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  const loginResult = await loginUser(loginData)

  const hasErrors: boolean = !!(loginResult.error)

  if (hasErrors) {
    dispatch({ type: LOGIN_FAILED })

    dispatch({
      type: GET_ERRORS,
      payload: loginResult.error
    })
  } else {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        ...loginResult.user,
        token: loginResult.token
      }
    })
  }
}


export const setUser = (authResult) => (dispatch) => {
  if (!authResult.error) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        ...authResult.user
      }
    })
  }
}


export const logout = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT_SUCCESS })
}
