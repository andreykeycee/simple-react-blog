import React from 'react'
import AuthBase from '@/components/Auth/AuthBase'
import BaseInputGroup from '@/components/base/BaseInput/BaseInputGroup'
import { createObjectFromStrings, match, typeIs } from 'srb-shared'
import { emailRe, passwordRe } from '@/components/base/BaseInput/input.utils'

class AuthRegister extends React.Component<{}, AuthRegisterState> {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      name: '',
      password: '',
      passwordToConfirm: '',
      errors: createObjectFromStrings(
        false,
        'email', 'name', 'password', 'passwordToConfirm'
      )
    }
  }

  setValue = (key: keyof AuthRegisterState) => (e) => {
    const { value } = e.target

    this.setState({
      ...this.state,
      [key]: value
    })
  }

  verifyValue = (key: keyof RegisterForm, value: string) => {
    const isValid = match(key)
      .when(keyIs('email'), () => emailRe.test(value))
      .when(keyIs('password'), () => passwordRe.test(value))
      .when(keyIs('passwordToConfirm'), () => value === this.state.password)
      .otherwise(true)

    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        [key]: !isValid
      }
    })
  }

  generateError = (key: keyof RegisterForm) => {
    const errorText = (): string => match(key)
      .when(keyIs('email'), 'wrong email')
      .when(keyIs('password'), 'password too weak')
      .when(keyIs('passwordToConfirm'), 'passwords do not match')
      .otherwise('unknown error')

    return this.state.errors[key]
      ? errorText()
      : ''
  }

  onSubmit = () => {
    console.log('test')
  }

  render () {
    const { email, name, password, passwordToConfirm } = this.state

    return (
      <AuthBase
        title="Registration"
        buttonText="Submit"
        onSubmit={this.onSubmit}
      >
        <div className="register-form">
          <BaseInputGroup
            label="email"
            name="email"
            value={email}
            errorText={this.generateError('email')}
            setValue={this.setValue('email')}
          />
          <BaseInputGroup
            label="name"
            name="name"
            value={name}
            errorText={this.generateError('name')}
            setValue={this.setValue('name')}
          />
          <BaseInputGroup
            label="password"
            name="password"
            value={password}
            errorText={this.generateError('password')}
            setValue={this.setValue('password')}
          />
          <BaseInputGroup
            label="passwordToConfirm"
            name="passwordToConfirm"
            value={passwordToConfirm}
            errorText={this.generateError('passwordToConfirm')}
            setValue={this.setValue('passwordToConfirm')}
          />
        </div>
      </AuthBase>
    )
  }
}

export default AuthRegister

const keyIs = typeIs

type RegisterForm = {
  name: string
  email: string
  password: string
  passwordToConfirm: string
}

type AuthRegisterState = RegisterForm & {
  errors: UIErrors<RegisterForm>
}

type UIErrors<S> = {
  [K in keyof S]: boolean
}