import React from 'react'
import AuthLogin from '@/components/Auth/AuthLogin'
import { withAuthMiddleware } from '@/lib/auth'

const LoginPage = () => {
  return <AuthLogin/>
}

export default withAuthMiddleware(LoginPage)

