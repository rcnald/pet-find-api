import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { createAndAuthenticateOrg } from "@/lib/utils/create-and-authenticate-org"

describe("Adopt (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to conclude an adoption", async () => {
    const { orgId } = await createAndAuthenticateOrg(app)

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

    const adoption = await prisma.adoption.create({
      data: {
        pet_id: pet.id,
        org_id: orgId,
      },
    })

    const adoptResponse = await request(app.server).patch(
      `/adoptions/${adoption.id}/adopt`,
    )

    expect(adoptResponse.statusCode).toEqual(200)
    expect(adoptResponse.body.adoption).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
