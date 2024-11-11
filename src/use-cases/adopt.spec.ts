import { beforeEach, describe, expect, it } from "vitest"
import { OrgsRepository } from "@/repositories/orgs-repository"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { InMemoryAdoptionsRepository } from "@/repositories/in-memory/in-memory-adoptions-repository"
import { AdoptUseCase } from "./adopt"
import { ResourceNotFoundError } from "./error/resource-not-found-error"

let orgsRepository: OrgsRepository
let petsRepository: PetsRepository
let adoptionsRepository: AdoptionsRepository
let sut: AdoptUseCase

describe("Adopt", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    adoptionsRepository = new InMemoryAdoptionsRepository()

    sut = new AdoptUseCase(adoptionsRepository)
  })

  it("should be able to finish an adoption", async () => {
    const org = await orgsRepository.create({
      name: "treze pets",
      city: "sao paulo",
      email: "ronaldomjunior05@gmail.com",
      neighborhood: "independência",
      password_hash: "ronaldo250805",
      phone: "11983776287",
      number: "106",
      responsible: "ronaldo",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    const pet = await petsRepository.create({
      age: 13,
      bio: "Preto",
      breed: "pastor",
      energy_level: 1,
      independence_level: "MODERATELY",
      medical_info: "intolerancia",
      name: "Ricard",
      size: "MEDIUM",
      space_needs: "INDOOR_ONLY",
      type: "DOG",
      city: "sao paulo",
      neighborhood: "independência",
      number: "106",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    const adoption = await adoptionsRepository.create({
      org_id: org.id,
      pet_id: pet.id,
    })

    const { adoption: adoptionAdopted } = await sut.execute({
      adoption_id: adoption.id,
    })

    expect(adoptionAdopted.adopted_at).toEqual(expect.any(Date))
  })

  it("should not be able to detail an adoption, with not existence pet id", async () => {
    const org = await orgsRepository.create({
      name: "treze pets",
      city: "sao paulo",
      email: "ronaldomjunior05@gmail.com",
      neighborhood: "independência",
      password_hash: "ronaldo250805",
      phone: "11983776287",
      number: "106",
      responsible: "ronaldo",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    const pet = await petsRepository.create({
      age: 13,
      bio: "Preto",
      breed: "pastor",
      energy_level: 1,
      independence_level: "MODERATELY",
      medical_info: "intolerancia",
      name: "Ricard",
      size: "MEDIUM",
      space_needs: "INDOOR_ONLY",
      type: "DOG",
      city: "sao paulo",
      neighborhood: "independência",
      number: "106",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    await adoptionsRepository.create({
      org_id: org.id,
      pet_id: pet.id,
    })

    await expect(() =>
      sut.execute({
        adoption_id: "not-existing-adoption-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
