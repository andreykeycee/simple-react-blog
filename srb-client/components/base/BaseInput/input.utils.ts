import { FormEvent } from 'react'

export const emailRe: RegExp = /\\@/

export const passwordRe: RegExp = /\\@/

export type BaseInputProps = {
  value: string
  name: string
  setValue: (e: FormEvent) => void
}