import { NextRouter } from '@/node_modules/next/dist/next-server/lib/router/router'

export const isAuthPath = (pathname: string): boolean => /\/auth\?*/.test(pathname)

export const testPathname = (
  router: NextRouter,
  predicate: (pathname: NextRouter['pathname']) => boolean
): boolean => {
  return typeof window !== 'undefined'
    ? predicate(router.pathname)
    : false
}

export const redirect = ({ Router, res = null }, location) => {
  if (typeof window === 'undefined') {
    res && (() => {
      res.writeHead(302, {
        Location: location
      })
      res.end()
    })()
  } else {
    Router.push(location)
  }
}
