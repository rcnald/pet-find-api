import { FastifyInstance } from "fastify"
import request from "supertest"
import { prisma } from "../prisma"
import { hash } from "bcryptjs"

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      email: "ronaldomjunior05@gmail.com",
      password_hash: await hash("ronaldo250805", 13),
      phone: "11983776287",
      responsible: "ronaldo",
      address: {
        create: {
          city: "sao paulo",
          neighborhood: "independência",
          street: "alberto borges soveral",
          number: "106",
          state: "SP",
          zip_code: "05875210",
        },
      },
    },
  })

  const authResponse = await request(app.server).post("/sessions").send({
    email: "ronaldomjunior05@gmail.com",
    password: "ronaldo250805",
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
