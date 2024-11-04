import { beforeEach, describe, expect, it } from "vitest"
import { OrgsRepository } from "@/repositories/orgs-repository"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./error/invalid-credentials-error"
import { hash } from "bcryptjs"

let orgsRepository: OrgsRepository
let sut: AuthenticateUseCase

describe("Authenticate", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)

    const password_hash = await hash("ronaldo250805", 13)

    orgsRepository.create({
      city: "sao paulo",
      email: "ronaldomjunior05@gmail.com",
      neighborhood: "independência",
      password_hash,
      phone: "11983776287",
      number: "106",
      responsible: "ronaldo",
      state: "SP",
      street: "alberto borges soveral",
      zip_code: "05875210",
    })
  })

  it("should be able to authenticate as an org", async () => {
    const { org } = await sut.execute({
      password: "ronaldo250805",
      email: "ronaldomjunior05@gmail.com",
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate as an org, with invalid password", async () => {
    await expect(() =>
      sut.execute({
        password: "invalidPassword",
        email: "ronaldomjunior05@gmail.com",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate as an org, with invalid email", async () => {
    await expect(() =>
      sut.execute({
        password: "ronaldo250805",
        email: "invalid@email.com",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
