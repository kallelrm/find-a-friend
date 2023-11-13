import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'

export const app = fastify()

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation Erro', issued: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO log numa ferramenta externa
  }

  return res.status(500).send({ message: 'Internal server error' })
})
