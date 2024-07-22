import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER' })

// const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteSomeoneElse = ability.can('delete', 'User')

// console.log('GSS userCanInviteSomeoneElse', userCanInviteSomeoneElse)
console.log('GSS userCanDeleteSomeoneElse', userCanDeleteSomeoneElse)
