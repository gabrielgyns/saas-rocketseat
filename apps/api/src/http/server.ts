import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  //   jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Indicating to fastify how it will handle the serialize and validation, in this case, with Zod
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Registering
app.register(fastifyCors)

// Registering Routes
app.register(createAccount)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
