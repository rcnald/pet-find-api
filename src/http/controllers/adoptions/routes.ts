import { FastifyInstance } from "fastify"
import { create } from "./create"
import { verifyJWT } from "@/http/middlewares/verifyJWT"
import { fetch } from "./fetch"
import { detail } from "./detail"

export async function adoptionsRoutes(app: FastifyInstance) {
  app.post("/adoptions", { onRequest: [verifyJWT] }, create)
  app.get("/adoptions", fetch)
  app.get("/adoptions/:pet_id", detail)
}
