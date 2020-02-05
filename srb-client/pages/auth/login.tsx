import React from 'react'
import { AuthState } from '@/reducers/auth'
import AuthLogin from '@/components/Auth/AuthLogin'
import { withRedux } from '@/lib/redux'
import { connect } from 'react-redux'

class LoginPage extends React.Component<LoginPageProps> {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { user } = this.props

    console.log(user)
  }

  render () {
    return <AuthLogin/>
  }
}

const mapStateToProps = ({ auth: user }: { auth: AuthState }) => ({ user })

export default withRedux(connect(mapStateToProps)(LoginPage))

type LoginPageProps = {
  user: AuthState
}
