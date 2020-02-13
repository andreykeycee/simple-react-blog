export const fallible = async ({ trier, catcher }) => {
  try {
    return trier()
  } catch (e) {
    return catcher(e)
  }
}
