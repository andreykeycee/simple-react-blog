import { client } from '@/helpers/apollo/utils'
import { fallible } from 'srb-shared'
import register_mutation from '@/graph/auth/register.graphql'


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