import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { createAndAuthenticateOrg } from "@/lib/utils/create-and-authenticate-org"

describe("Fetch adoptable pets (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to fetch adoptable pets", async () => {
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

    const petOne = await prisma.pet.create({
      data: {
        age: 13,
        breed: null,
        energy_level: 2,
        independence_level: "MODERATELY",
        medical_info: null,
        name: "Rafaela",
        size: "SMALL",
        space_needs: "INDOOR_ONLY",
        type: "CAT",
        bio: null,
        address: {
          create: {
            city: "rio de janeiro",
            neighborhood: "independência",
            street: "alberto borges soveral",
            number: "106",
            state: "RJ",
            zip_code: "05875210",
          },
        },
      },
    })

    await prisma.adoption.createMany({
      data: [
        { pet_id: pet.id, org_id: orgId },
        { pet_id: petOne.id, org_id: orgId },
      ],
    })

    const fetchPetsResponse = await request(app.server)
      .get("/adoptions")
      .query({ city: "sao paulo", state: "SP" })

    expect(fetchPetsResponse.statusCode).toEqual(200)
    expect(fetchPetsResponse.body.pets).toHaveLength(1)
    expect(fetchPetsResponse.body.pets).toEqual([
      expect.objectContaining({ name: "Rodolfo" }),
    ])
  })
})
