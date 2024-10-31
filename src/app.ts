import fastify from "fastify"
import { ZodError } from "zod"
import { env } from "./env"
import { orgsRoutes } from "./http/controllers/orgs/routes"
import { petsRoutes } from "./http/controllers/pets/routes"

export const app = fastify()

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: "Validation error", issues: error.format() })
  }

  if (env.NODE_ENV === "production") {
    console.log(error)
  }

  return rep
    .status(500)
    .send(
      env.NODE_ENV === "dev"
        ? { message: "Internal server error!", issues: error.message }
        : { message: "Internal server error!" },
    )
})
