import { _Error, match, typeIs } from 'srb-shared'
import { CLEAR_ERRORS, GET_ERRORS } from '@/actions'

const initialState: ErrorState = {
  type: null,
  message: null
}

export default (state = initialState, action: ErrorAction) => {
  return match(action.type)
    .when(typeIs(GET_ERRORS), () => action.payload)
    .when(typeIs(CLEAR_ERRORS), () => initialState)
    .otherwise(state)
}

type ErrorState = _Error

type ErrorAction = {
  type: string
  payload: _Error
}