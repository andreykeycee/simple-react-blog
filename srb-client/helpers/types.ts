export type UIErrors<S> = {
  [K in keyof S]: boolean
}