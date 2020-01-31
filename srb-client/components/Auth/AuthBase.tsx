import React, { ReactNode }  from 'react'

const AuthBase = ({
  children,
  title,
  buttonText,
  onSubmit
}: AuthBaseProps) => (
  <div className="auth-base">
    <div className="title-block">{ title }</div>
    <div className="auth-form">
      { children }
    </div>
    <div className="auth-button" onClick={onSubmit}>{ buttonText }</div>
  </div>
)

export default AuthBase

type AuthBaseProps = {
  children: ReactNode
  title: string
  buttonText: string
  onSubmit: () => void
}