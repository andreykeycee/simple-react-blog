import React from 'react'
import { createObjectFromStrings, match, typeIs } from 'srb-shared'
import { UIErrors } from '@/helpers/types'
import AuthBase from './AuthBase'
import BaseInputGroup from '@/components/base/BaseInput/BaseInputGroup'
import { emailRe } from '@/components/base/BaseInput/input.utils'
import { login } from '@/actions/auth'
import { connect } from 'react-redux'


class AuthLogin extends React.Component<AuthLoginProps, AuthLoginState> {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: createObjectFromStrings(false, 'email', 'password')
    }
  }

  setValue = (key: keyof LoginForm) => (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    const errors = this.verifyValue(key, value)

    this.setState({
      ...this.state,
      [key]: value,
      errors
    })
  }

  verifyValue = (key: keyof LoginForm, value: string): UIErrors<LoginForm> => {
    const isValid = match(key)
      .when(keyIs('email'), () => emailRe.test(value))
      .otherwise(true)

    return {
      ...this.state.errors,
      [key]: !isValid
    }
  }

  generateError = (key: keyof LoginForm) => {
    const errorText = (): string => match(key)
      .when(keyIs('email'), 'wrong email')
      .otherwise('unknown error')

    return this.state.errors[key]
      ? errorText()
      : ''
  }

  onSubmit = async () => {
    const { errors, ...form } = this.state

    await this.props.submitForm(form)
  }

  render () {
    const { email, password } = this.state
    const link = {
      text: 'don\'t have an account?',
      path: '/auth/register'
    }

    return (
      <AuthBase
        title="Login"
        buttonText="Sign in"
        link={link}
        onSubmit={this.onSubmit}
      >
        <BaseInputGroup
          label="email"
          name="email"
          value={email}
          errorText={this.generateError('email')}
          setValue={this.setValue('email')}
        />
        <BaseInputGroup
          label="password"
          name="password"
          value={password}
          type="password"
          errorText={this.generateError('password')}
          setValue={this.setValue('password')}
        />
      </AuthBase>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: (form: LoginForm) => dispatch(login(form))
})

export default connect(state => ({}), mapDispatchToProps)(AuthLogin)

const keyIs = typeIs

type AuthLoginProps = {
  submitForm: (form: LoginForm) => void
}

type LoginForm = {
  email: string
  password: string
}

type AuthLoginState = LoginForm & {
  errors: UIErrors<LoginForm>
}
