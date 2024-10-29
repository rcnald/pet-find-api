import { Address, Org } from "@prisma/client"
import { CreateOrgParams, OrgsRepository } from "../orgs-repository"
import { randomUUID } from "node:crypto"

export class InMemoryOrgRepository implements OrgsRepository {
  public orgs: Org[] = []
  public addresses: Address[] = []

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: CreateOrgParams) {
    const address: Address = {
      id: randomUUID(),
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
      state: data.state,
      zip_code: data.zip_code,
    }

    this.addresses.push(address)

    const org: Org = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      responsible: data.responsible,
      address_id: address.id,
    }

    this.orgs.push(org)

    return org
  }
}
