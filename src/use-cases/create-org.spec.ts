import { beforeEach, describe, expect, it } from "vitest"
import { CreateOrgUseCase } from "./create-org"
import { OrgsRepository } from "@/repositories/orgs-repository"
import { OrgAlreadyExistsError } from "./error/org-already-exists-error"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"

let orgsRepository: OrgsRepository
let sut: CreateOrgUseCase

describe("Create org", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it("should be able to create an org", async () => {
    const { org } = await sut.execute({
      name: "treze pets",
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

    expect(org.id).toEqual(expect.any(String))
  })

  it("should not be able to create an org with email already registered", async () => {
    const orgData = {
      name: "treze pets",
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
    }

    await sut.execute(orgData)

    await expect(() => sut.execute(orgData)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })
})
