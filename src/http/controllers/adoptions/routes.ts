import { FastifyInstance } from "fastify"
import { create } from "./create"
import { verifyJWT } from "@/http/middlewares/verifyJWT"

export async function adoptionsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT)

  app.post("/adoptions", create)
}
