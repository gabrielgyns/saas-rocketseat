'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { singInWithGithub } from '../actions'
import { signUpAction } from './actions'

export default function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  const showErrorMessage = (error: string) => (
    <p className="text-xs font-medium text-red-500 dark:text-red-400">
      {error}
    </p>
  )

  return (
    <div className="space-y-4">
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />

          {errors?.name && showErrorMessage(errors?.name[0])}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" />

          {errors?.email && showErrorMessage(errors?.email[0])}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />

          {errors?.password && showErrorMessage(errors?.password[0])}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
          />

          {errors?.password_confirmation &&
            showErrorMessage(errors?.password_confirmation[0])}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create an account'
          )}
        </Button>

        <Button variant="link" className="w-full" asChild size="sm">
          <Link href="/auth/sign-in">Already have an account? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <form action={singInWithGithub}>
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={isPending}
        >
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
