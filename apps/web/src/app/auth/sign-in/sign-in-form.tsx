'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useTransition } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWIthEmailAndPassword } from './actions'

export default function SignInForm() {
  //   const [{ success, errors, message }, formAction, isPending] = useActionState(
  //     signInWIthEmailAndPassword,
  //     { success: false, message: null, errors: null },
  //   )

  /*
    TODO: Here we could have used the `useActionState` hook to handle the form state
    but it was decided to use the `useState` hook since the `useActionState` hook
    is cleaning the form, in a way that the user has to fill the form again in case of error.
    Using the `useState` hook, the user can see the error and fix it without losing the form data.
    Coz of `e.preventDefault()`.
  */

  const [isPending, startTransition] = useTransition()

  const [{ success, message, errors }, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: { [key: string]: string[] } | null
  }>({
    success: false,
    message: null,
    errors: null,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const state = await signInWIthEmailAndPassword(formData)

      setFormState(state)
    })
  }

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

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="text" id="email" name="email" />

        {errors?.email && showErrorMessage(errors?.email[0])}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />

        {errors?.password && showErrorMessage(errors?.password[0])}

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with email'
        )}
      </Button>

      <Button variant="link" className="w-full" asChild size="sm">
        <Link href="/auth/sign-up">Create a new account</Link>
      </Button>

      <Separator />

      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={isPending}
      >
        <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
        Sign in with Github
      </Button>
    </form>
  )
}
