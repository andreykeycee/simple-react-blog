export const match = (compare) => {

  const solved = (output) => ({
    when: () => solved(output),
    otherwise: () => output
  })

  const when = (predicate, output) => {

    const resolved = () => typeof output === 'function'
      ? output()
      : output

    return predicate(compare)
      ? solved(resolved())
      : match(compare)
  }

  const otherwise = (output) => output

  return {
    when,
    otherwise
  }
}

export const typeIs = <T = string>(...types: T[]) => (type: T) => types.includes(type)
