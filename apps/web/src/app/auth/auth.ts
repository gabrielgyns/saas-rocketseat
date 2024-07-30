import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

// TODO: we should be able to verify the token. For now, we are just checking if it exists.
// UPDATE: In the `auth()` function if the profile request fails, we redirect to sign-out.
// That means, if the token is invalid, the user will be redirected to sign-out.
export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

/**
 * Returns informations about the current user's membership,
 * like the `id`, `role` and `organization_id`.
 */
export async function getCurrentMembership() {
  const org = getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

/**
 *
 * @returns The current organization's slug.
 */
export function getCurrentOrg() {
  return cookies().get('org')?.value ?? null
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (error) {
    // cookies().delete('token') -> No can do, cookies are read-only here
    console.error(error)
  }

  redirect('/api/auth/sign-out')
}
