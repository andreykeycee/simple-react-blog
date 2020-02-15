import { BlogPost, BlogPostModel, BlogPostSearch } from '@/models/BlogPost'
import { DateObject, DateRange, match, parseDateObjectsRange, typeIs } from 'srb-shared'

export const getPosts = async (search: BlogPostSearch): Promise<BlogPost[]> => {
  const dbQuery = getDbQuery(search)

  return BlogPostModel.find(dbQuery).exec()
}


const getDbQuery = (search: BlogPostSearch): Object => {
  return Object.entries(search).reduce((query, [ key, value ]) => {
    const newQuery = value
      ? match(key)
        .when(
          keyIs('stringSearch'),
          () => getStringSearchQuery(value as string)
        )
        .when(
          keyIs('dateSearch'),
          () => getDateSearchQuery(value as DateRange<DateObject>)
        )
        .when(
          keyIs('author'),
          () => ({ author: value })
        )
        .otherwise({})
      : {}

    return { ...query, ...newQuery }
  }, {})
}


const getStringSearchQuery = (string: string) => ({
  title: { $regex: string },
  body: { $regex: string }
})


const getDateSearchQuery = (dates: DateRange<DateObject>) => {
  const dateRange: DateRange<Date> = parseDateObjectsRange(dates)

  return {
    createdAt: {
      $gte: dateRange.start,
      $lte: dateRange.end
    }
  }
}


const keyIs = typeIs
