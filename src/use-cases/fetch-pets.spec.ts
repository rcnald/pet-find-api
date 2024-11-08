import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { FetchPetsUseCase } from "./fetch-pets"
import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { InMemoryAdoptionsRepository } from "@/repositories/in-memory/in-memory-adoptions-repository"

let adoptionsRepository: AdoptionsRepository
let petsRepository: PetsRepository
let sut: FetchPetsUseCase

describe("Fetch pets", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    adoptionsRepository = new InMemoryAdoptionsRepository()
    sut = new FetchPetsUseCase(adoptionsRepository, petsRepository)

    Array.from({ length: 13 }).forEach(async (_, index) => {
      let stateToFetch = "RJ"
      let cityToFetch = "rio de janeiro"

      if (index > 5) {
        stateToFetch = "SP"
        cityToFetch = "sao paulo"
      }

      const pet = await petsRepository.create({
        age: 13,
        bio: "Preto",
        breed: "pastor",
        energy_level: 1,
        independence_level: "MODERATELY",
        medical_info: "intolerancia",
        name: "Ricardo",
        size: "MEDIUM",
        space_needs: "INDOOR_ONLY",
        type: "DOG",
        city: cityToFetch,
        neighborhood: "independência",
        number: "106",
        state: stateToFetch,
        street: "alberto borges soveral",
        zip_code: "05875210",
      })

      await adoptionsRepository.create({
        org_id: "org-id-01",
        pet_id: pet.id,
      })
    })
  })

  it("should be able to fetch pets by city", async () => {
    const { pets } = await sut.execute({ city: "sao paulo", state: "SP" })

    expect(pets).toHaveLength(7)
  })
  it("should be able to fetch pets by city, order by match filters", async () => {
    const petOne = await petsRepository.create({
      age: 13,
      bio: "Preto",
      breed: "pastor",
      energy_level: 1,
      independence_level: "MODERATELY",
      medical_info: "intolerancia",
      name: "Henrique",
      size: "LARGE",
      space_needs: "INDOOR_ONLY",
      type: "DOG",
      city: "rio de janeiro",
      neighborhood: "independência",
      number: "106",
      state: "RJ",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    await adoptionsRepository.create({
      org_id: "org-id-01",
      pet_id: petOne.id,
    })

    const petTwo = await petsRepository.create({
      age: 13,
      bio: "Preto",
      breed: "pastor",
      energy_level: 1,
      independence_level: "MODERATELY",
      medical_info: "intolerancia",
      name: "Natalia",
      size: "LARGE",
      space_needs: "INDOOR_ONLY",
      type: "CAT",
      city: "rio de janeiro",
      neighborhood: "independência",
      number: "106",
      state: "RJ",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    await adoptionsRepository.create({
      org_id: "org-id-01",
      pet_id: petTwo.id,
    })

    const { pets } = await sut.execute({
      city: "rio de janeiro",
      state: "RJ",
      size: "LARGE",
      type: "CAT",
    })

    expect(pets).toHaveLength(8)
    expect(pets).toEqual([
      expect.objectContaining({ name: "Natalia" }),
      expect.objectContaining({ name: "Henrique" }),
      expect.objectContaining({ name: "Ricardo" }),
      expect.objectContaining({ name: "Ricardo" }),
      expect.objectContaining({ name: "Ricardo" }),
      expect.objectContaining({ name: "Ricardo" }),
      expect.objectContaining({ name: "Ricardo" }),
      expect.objectContaining({ name: "Ricardo" }),
    ])
  })
})
