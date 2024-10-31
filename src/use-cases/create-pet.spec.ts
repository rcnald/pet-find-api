import { beforeEach, describe, expect, it } from "vitest"
import { PetsRepository } from "@/repositories/pets-repository"
import { CreatePetUseCase } from "./create-pet"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"

let petsRepository: PetsRepository
let sut: CreatePetUseCase

describe("Create pet", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
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
      residencial_number: "106",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
