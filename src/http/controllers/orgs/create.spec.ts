import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"

describe("Create org (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to create an org", async () => {
    const createOrgResponse = await request(app.server).post("/orgs").send({
      city: "sao paulo",
      email: "ronaldomjunior05@gmail.com",
      neighborhood: "independência",
      password: "ronaldo250805",
      phone: "11983776287",
      residencial_number: "106",
      responsible: "ronaldo",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    expect(createOrgResponse.statusCode).toEqual(201)
  })
})
