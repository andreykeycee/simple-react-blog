import { Field, InputType } from 'type-graphql'
import { DateObject, DateRange } from 'srb-shared'

@InputType()
class DateObjectClass {
  @Field()
  day: number

  @Field()
  month: number

  @Field()
  year: number
}

@InputType()
export class DateRangeClass implements DateRange<DateObject> {
  @Field(returns => DateObjectClass)
  start: DateObject

  @Field(returns => DateObjectClass)
  end: DateObject
}
