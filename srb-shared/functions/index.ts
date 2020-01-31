export * from './match'
export * from './fallible'

export const createObjectFromStrings = <T>(
  initial: any,
  ...propNames: string[]
): Object | T => {

  return propNames.reduce((object, name) => ({
    ...object,
    [name]: typeof initial === 'function'
      ? initial()
      : initial
  }), {})
}