import { GET_ERRORS, REGISTER_FAILED, REGISTER_SUCCESS, USER_LOADING } from '@/actions/actionTypes'
import { registerUser } from '@/helpers/apollo/auth'

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