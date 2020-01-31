import React from 'react'
import { BaseInputProps } from '@/components/base/BaseInput/input.utils'

const BaseInput = ({ value, setValue, name }: BaseInputProps) => {

  return <input
    value={value}
    onInput={setValue}
    name={name}
  />
}

export default BaseInput