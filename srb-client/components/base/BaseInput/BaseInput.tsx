import React from 'react'
import { BaseInputProps } from '@/components/base/BaseInput/input.utils'

const BaseInput = ({ setValue, ...attrs }: BaseInputProps) => (
  <input { ...attrs} onChange={setValue} />
)

export default BaseInput