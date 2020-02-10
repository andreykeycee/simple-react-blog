import { getUser } from '@/helpers/apollo/auth'
import { AuthAction } from '@/reducers/auth'

export const authMiddleware = async (
  token: string,
  setUser: (user: any) => void,
  redirect
) => {
  if (token) {
    const authResult = await getUser(token)

    setUser(authResult)
    redirect.index()
  } else {
    redirect.auth()
  }
}
