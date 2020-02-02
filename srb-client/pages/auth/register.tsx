import React from 'react'
import AuthRegister from '@/components/Auth/AuthRegister'
import { withRedux } from '@/lib/redux'
import Router from 'next/router'
import { AuthState } from '@/reducers/auth'
import { connect } from 'react-redux'

class RegisterPage extends React.Component<RegisterPageProps> {
  constructor (props: RegisterPageProps) {
    super(props)
  }

  componentDidMount () {
    const { user } = this.props

    console.log(user)
  }

  render () {
    return <AuthRegister/>
  }
}

const mapStateToProps = ({ auth: user }: { auth: AuthState }) => ({ user })

export default withRedux(connect(mapStateToProps)(RegisterPage))

type RegisterPageProps = {
  user: AuthState
}