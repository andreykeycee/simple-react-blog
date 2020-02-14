export type DateRange<D = Date | DateObject> = {
  start: D
  end: D
}

export type DateObject = {
  day: number
  month: number
  year: number
}
