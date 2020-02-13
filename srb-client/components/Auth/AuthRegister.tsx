import React from 'react'
import AuthBase from '@/components/Auth/AuthBase'
import BaseInputGroup from '@/components/base/BaseInput/BaseInputGroup'
import { createObjectFromStrings, match, typeIs } from 'srb-shared'
import { emailRe, passwordRe } from '@/components/base/BaseInput/input.utils'
import { register } from '@/actions/auth'
import { connect } from 'react-redux'
import { UIErrors } from '@/helpers/types'

class AuthRegister extends React.Component<AuthRegisterProps, AuthRegisterState> {
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

  get isValidForm (): boolean {
    return !!Object.values(this.state.errors).filter(x => x).length
  }

  setValue = (key: keyof RegisterForm) => (e) => {
    const { value } = e.target

    const errors = this.verifyValue(key, value)

    this.setState({
      ...this.state,
      [key]: value,
      errors
    })
  }

  verifyValue = (key: keyof RegisterForm, value: string): RegisterErrors => {
    const isValid = match(key)
      .when(keyIs('email'), () => emailRe.test(value))
      .when(keyIs('password'), () => passwordRe.test(value))
      .when(keyIs('passwordToConfirm'), () => value === this.state.password)
      .otherwise(true)

    return {
      ...this.state.errors,
      [key]: !isValid
    }
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

  onSubmit = async () => {
    const { errors, ...form } = this.state

    await this.props.submitForm(form)
  }

  render () {
    const { email, name, password, passwordToConfirm } = this.state

    const link = {
      text: 'already registered?',
      path: '/auth/login'
    }

    return (
      <AuthBase
        title="Registration"
        buttonText="Sign up"
        link={link}
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
            type="password"
            errorText={this.generateError('password')}
            setValue={this.setValue('password')}
          />
          <BaseInputGroup
            label="passwordToConfirm"
            name="passwordToConfirm"
            value={passwordToConfirm}
            type="password"
            errorText={this.generateError('passwordToConfirm')}
            setValue={this.setValue('passwordToConfirm')}
          />
        </div>
      </AuthBase>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: async (form: RegisterForm) => dispatch(register(form))
})

export default connect(state => ({}), mapDispatchToProps)(AuthRegister)

const keyIs = typeIs

type AuthRegisterProps = {
  submitForm: (form: RegisterForm) => void
}

type AuthRegisterState = RegisterForm & {
  errors: UIErrors<RegisterForm>
}

type RegisterForm = {
  name: string
  email: string
  password: string
  passwordToConfirm: string
}

type RegisterErrors = UIErrors<RegisterForm>
