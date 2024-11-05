import fastify from "fastify"
import { ZodError } from "zod"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { env } from "./env"
import { orgsRoutes } from "./http/controllers/orgs/routes"
import { petsRoutes } from "./http/controllers/pets/routes"
import { adoptionsRoutes } from "./http/controllers/adoptions/routes"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: { expiresIn: "10m" },
})
app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)
app.register(adoptionsRoutes)

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
