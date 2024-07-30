import { api } from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

// The difference between `never` and `void` is that `never` is a type that represents the absence of a value,
// while `void` is a type that represents the absence of a value of any type.
// In other words, we can "use" the result of void, but we can't "use" the result of never (TS will complain).
type SignUpResponse = void

export async function signUp({
  name,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api
    .post('user', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SignUpResponse>()
}
