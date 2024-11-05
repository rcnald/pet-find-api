import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { createAndAuthenticateOrg } from "@/lib/utils/create-and-authenticate-org"

describe("Create adoption (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to create an adoption", async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        age: 13,
        breed: null,
        energy_level: 2,
        independence_level: "MODERATELY",
        medical_info: null,
        name: "Rodolfo",
        size: "SMALL",
        space_needs: "INDOOR_ONLY",
        type: "CAT",
        bio: null,
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

    const createOrgResponse = await request(app.server)
      .post("/adoptions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        pet_id: pet.id,
      })

    expect(createOrgResponse.statusCode).toEqual(201)
  })
})
