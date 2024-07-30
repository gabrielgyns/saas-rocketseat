'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

// We are using `actions.ts`in the `auth` folder coz it needs to be accessed by SignIn and SignUp.
export async function singInWithGithub() {
  const githubSignInUrl = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInUrl.searchParams.set(
    'redirect_url',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
  )
  githubSignInUrl.searchParams.set('scope', 'user')

  redirect(githubSignInUrl.toString())
}
