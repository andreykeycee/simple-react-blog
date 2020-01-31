import React from 'react'
import { BaseInputProps } from '@/components/base/BaseInput/input.utils'
import BaseInput from '@/components/base/BaseInput/BaseInput'

const BaseInputGroup = (props: BaseInputGroupProps) => {
  const { label, ...inputProps } = props

  return (
    <div className="base-input-group">
      <label htmlFor={props.name}>{ label }</label>
      <div className="input-container">
        <BaseInput { ...inputProps }/>
      </div>
    </div>
  )
}

export default BaseInputGroup

type BaseInputGroupProps = BaseInputProps & {
  label: string
}