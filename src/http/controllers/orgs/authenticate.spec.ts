import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

describe("Authenticate org (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to authenticate as an org", async () => {
    const password_hash = await hash("ronaldo250805", 13)

    await prisma.org.create({
      data: {
        email: "ronaldomjunior05@gmail.com",
        password_hash,
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

    const authenticateOrgResponse = await request(app.server)
      .post("/sessions")
      .send({
        email: "ronaldomjunior05@gmail.com",
        password: "ronaldo250805",
      })

    expect(authenticateOrgResponse.statusCode).toEqual(200)
    expect(authenticateOrgResponse.body).toEqual({ token: expect.any(String) })
  })
})
