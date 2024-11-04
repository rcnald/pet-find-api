import bcryptjs from "bcryptjs"
import { Org } from "@prisma/client"
import { OrgsRepository } from "@/repositories/orgs-repository"
import { InvalidCredentialsError } from "./error/invalid-credentials-error"

const { compare } = bcryptjs

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const passwordMatches = await compare(password, org.password_hash)

    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
