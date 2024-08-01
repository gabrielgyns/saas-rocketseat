'use client'

import { AlertTriangle } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
  const { slug: org } = useParams<{ slug: string }>()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [org, 'projects'],
      })
    },
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
          <AlertTitle>Save project failed!</AlertTitle>
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
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" />

        {errors?.name && showErrorMessage(errors?.name[0])}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />

        {errors?.description && showErrorMessage(errors?.description[0])}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        Save project
      </Button>
    </form>
  )
}
