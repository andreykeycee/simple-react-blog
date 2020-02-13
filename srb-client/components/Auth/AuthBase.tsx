import React, { ReactNode }  from 'react'
import { useRouter } from 'next/router'

const AuthBase = ({
  children,
  title,
  buttonText,
  onSubmit,
  link
}: AuthBaseProps) => {
  const router = useRouter()

  const linkOnClick = () => {
    router.push(link.path)
  }

  return (
    <div className="auth-base">
      <div className="title-block">{ title }</div>
      <div className="auth-form">
        { children }
      </div>
      <div className="auth-button" onClick={onSubmit}>{ buttonText }</div>
      <a className="additional-link" onClick={linkOnClick}>{ link.text }</a>
    </div>
  )
}

export default AuthBase

type AuthBaseProps = {
  children: ReactNode
  title: string
  buttonText: string
  onSubmit: () => void
  link?: {
    text: string
    path: string
  }
}
