'use client'

import { AlertTriangle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { createOrganizationAction } from './actions'

export function OrganizationForm() {
  //   const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createOrganizationAction,
    // () => {
    //   router.push('/auth/sign-in')
    // },
  )

  const showErrorMessage = (error: string) => (
    <p className="text-xs font-medium text-red-500 dark:text-red-400">
      {error}
    </p>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input id="name" name="name" />

        {errors?.name && showErrorMessage(errors?.name[0])}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">Email domain</Label>
        <Input
          type="text"
          id="domain"
          name="domain"
          inputMode="url"
          placeholder="example.com"
        />

        {errors?.domain && showErrorMessage(errors?.domain[0])}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            className="translate-y-0.5"
          />
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Save organization
      </Button>
    </form>
  )
}
