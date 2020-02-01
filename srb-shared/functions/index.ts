export * from './match'
export * from './fallible'

export const createObjectFromStrings = <T = Object>(
  initial: any,
  ...propNames: (keyof T)[]
): T => {

  return propNames.reduce((object, name) => ({
    ...object,
    [name]: typeof initial === 'function'
      ? initial()
      : initial
  }), {} as T)
}