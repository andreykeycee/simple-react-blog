import { BlogPost, BlogPostSearch, SearchField } from '@/models/BlogPost'
import { match, typeIs } from 'srb-shared'

export const getPosts = (search: BlogPostSearch): BlogPost[] => {
  const dbQuery = Object.keys(search).reduce((query, key) => {
    return {
      ...query,
      ...getDBQueryByKey(key as keyof BlogPostSearch, search[key], search)
    }
  }, {})
}

const getDBQueryByKey = <K extends keyof BlogPostSearch>(
  key: K,
  value: BlogPostSearch[K],
  search: BlogPostSearch
) => {
  return !value
    ? {}
    : match(key)
      .when(
        keyIs('stringSearch'),
        () => getSearchStringQuery(value, search.searchFields)
      )
}

const getSearchStringQuery = (value: string, searchFields: SearchField[]) => {
  const query = {
    title: { $regex: value },

  }
}

const keyIs = typeIs
