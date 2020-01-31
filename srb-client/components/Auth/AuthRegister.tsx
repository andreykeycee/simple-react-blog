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
        'email', 'name', 'password', 'passwordConfirmed'
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

  verifyValue = (key: keyof AuthRegisterState, value: string): boolean => {
    return match(key)
      .when(keyIs('email'), () => emailRe.test(value))
      .when(keyIs('password'), () => passwordRe.test(value))
      .when(keyIs('passwordConfirmed'), () => value === this.state.password)
      .otherwise(true)


  }

  onSubmit = () => {
    console.log('test')
  }

  render () {
    const { email } = this.state

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
            setValue={this.setValue('email')}
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