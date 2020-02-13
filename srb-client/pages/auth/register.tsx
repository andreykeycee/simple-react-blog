import React from 'react'
import AuthRegister from '@/components/Auth/AuthRegister'
import { withAuthMiddleware } from '@/lib/auth'

const RegisterPage = () => <AuthRegister/>

export default withAuthMiddleware(RegisterPage)

