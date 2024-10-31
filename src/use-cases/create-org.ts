import { OrgAlreadyExists } from "./error/org-already-exists-error"
import bcryptjs from "bcryptjs"
import { Org } from "@prisma/client"
import { OrgsRepository } from "@/repositories/orgs-repository"

const { hash } = bcryptjs

interface CreateOrgUseCaseRequest {
  responsible: string
  email: string
  password: string
  phone: string
  residencial_number: string
  state: string
  street: string
  city: string
  zip_code: string
  neighborhood: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
    email,
    neighborhood,
    password,
    phone,
    responsible,
    state,
    street,
    zip_code,
    residencial_number,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgExists = await this.orgsRepository.findByEmail(email)

    if (orgExists) {
      throw new OrgAlreadyExists()
    }

    const password_hash = await hash(password, 13)

    const org = await this.orgsRepository.create({
      city,
      email,
      neighborhood,
      number: residencial_number,
      password_hash,
      phone,
      responsible,
      state,
      street,
      zip_code,
    })

    return { org }
  }
}
