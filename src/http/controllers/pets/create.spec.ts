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

  it("should be able to create a pet", async () => {
    const createOrgResponse = await request(app.server).post("/pets").send({
      age: "13",
      breed: null,
      energy_level: "2",
      independence_level: "MODERATELY",
      medical_info: null,
      name: "Rodolfo",
      size: "SMALL",
      space_needs: "INDOOR_ONLY",
      type: "CAT",
      bio: null,
      city: "sao paulo",
      neighborhood: "independência",
      residencial_number: "106",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    expect(createOrgResponse.statusCode).toEqual(201)
  })
})
