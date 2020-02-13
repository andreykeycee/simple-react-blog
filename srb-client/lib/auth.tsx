import React from 'react'
import nextCookie from '@/node_modules/next-cookies'
import Router from '@/node_modules/next/dist/client/router'
import { getUser } from '@/helpers/apollo/auth'
import { setUser } from '@/actions/auth'
import { connect } from 'react-redux'
import { withRedux } from '@/lib/redux'
import { isAuthPath, redirect } from '@/helpers'


export const withAuthMiddleware = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { authResult, setUser, ...otherProps } = props
    authResult && setUser(authResult)

    return <WrappedComponent {...otherProps} />
  }

  Wrapper.getInitialProps = async (context) => {
    const { pathname, res } = context
    const { ['auth-token']: token } = nextCookie(context)

    let authResult

    if (token) {
      authResult = await getUser(token)

      if (isAuthPath(pathname)) {
        redirect({ Router, res }, '/')
      }
    } else if (!isAuthPath(pathname)) {
      redirect({ Router, res },'/auth/login')
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context))

    return { ...componentProps, authResult }
  }

  return withRedux(connect(() => ({}), mapDispatchToProps)(Wrapper))
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (authResult) => dispatch(setUser(authResult))
})
