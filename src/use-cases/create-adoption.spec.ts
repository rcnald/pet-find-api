import { beforeEach, describe, expect, it } from "vitest"
import { OrgsRepository } from "@/repositories/orgs-repository"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { InMemoryAdoptionsRepository } from "@/repositories/in-memory/in-memory-adoptions-repository"
import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { CreateAdoptionUseCase } from "./create-adoption"
import { PetsRepository } from "@/repositories/pets-repository"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { PetIsAlreadyUpForAdoptionError } from "./error/pet-is-already-up-for-adoption-error"

let adoptionsRepository: AdoptionsRepository
let sut: CreateAdoptionUseCase
let orgsRepository: OrgsRepository
let petsRepository: PetsRepository

describe("Create adoption", () => {
  beforeEach(() => {
    adoptionsRepository = new InMemoryAdoptionsRepository()
    sut = new CreateAdoptionUseCase(adoptionsRepository)
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
  })

  it("should be able to create an adoption", async () => {
    const org = await orgsRepository.create({
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

    const { adoption } = await sut.execute({
      org_id: org.id,
      pet_id: pet.id,
    })

    expect(adoption.id).toEqual(expect.any(String))
  })

  it("should not be able to create an adoption for the same pet", async () => {
    const org = await orgsRepository.create({
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

    await sut.execute({
      org_id: org.id,
      pet_id: pet.id,
    })

    await expect(() =>
      sut.execute({
        org_id: org.id,
        pet_id: pet.id,
      }),
    ).rejects.toBeInstanceOf(PetIsAlreadyUpForAdoptionError)
  })
})
