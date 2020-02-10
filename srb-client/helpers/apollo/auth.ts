import { client } from '@/helpers/apollo/utils'
import { fallible } from 'srb-shared'
import register_mutation from '@/graph/auth/register.graphql'
import login_query from '@/graph/auth/login.graphql'
import user_query from '@/graph/auth/user.graphql'


export const registerUser = async ({ name, email, password }) => {
  const registerAttempt = async () => await client.mutate({
    mutation: register_mutation,
    variables: {
      name,
      email,
      password
    }
  }).then(({ data }) => data.register)

  return fallible({
    trier: registerAttempt,
    catcher: console.error
  })
}


export const loginUser = async ({ email, password }) => {
  const loginAttempt = async () => await client.query({
    query: login_query,
    variables: {
      email,
      password
    }
  }).then(({ data }) => data.login)

  return fallible({
    trier: loginAttempt,
    catcher: console.error
  })
}


export const getUser = async (token: string) => {
  const getUserAttempt = async () => await client.query({
    query: user_query,
    variables: { token }
  }).then(({ data }) => data.user)

  return fallible({
    trier: getUserAttempt,
    catcher: console.error
  })
}
