import React from 'react'
import Home from '@/components/Home'
import { withAuthMiddleware } from '@/lib/auth'

const IndexPage = () => {
  return <Home/>
}

export default withAuthMiddleware(IndexPage)
