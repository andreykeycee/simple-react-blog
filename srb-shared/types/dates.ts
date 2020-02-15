export type DateRange<D = Date | DateObject> = {
  start: D
  end: D
}

export type DateObject = {
  day: number
  month: number
  year: number
}

export const parseDateObjectsRange = (dates: DateRange<DateObject>): DateRange<Date> => ({
  start: parseDateObject(dates.start),
  end: parseDateObject(dates.end)
})

export const parseDateObject = (date: DateObject): Date => {
  const { day, month, year } = date
  return new Date(year, month, day)
}
