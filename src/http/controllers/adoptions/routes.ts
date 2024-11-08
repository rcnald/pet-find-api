import { FastifyInstance } from "fastify"
import { create } from "./create"
import { verifyJWT } from "@/http/middlewares/verifyJWT"
import { fetch } from "./fetch"

export async function adoptionsRoutes(app: FastifyInstance) {
  app.post("/adoptions", { onRequest: [verifyJWT] }, create)
  app.get("/adoptions", fetch)
}
