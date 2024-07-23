import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

// Using fastifyPlugin coz its context/scope, when we create a middleware like this
// fastify will add it only to this file, to this context.
// Using fastifyPlugin like below, it adds to the entire application.
export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError('Invalid Auth Token')
      }
    }
  })
})
