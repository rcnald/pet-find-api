import { Adoption, Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { AdoptionsRepository } from "../adoptions-repository"

export class InMemoryAdoptionsRepository implements AdoptionsRepository {
  public adoptions: Adoption[] = []

  async create(data: Prisma.AdoptionUncheckedCreateInput) {
    const adoption: Adoption = {
      id: randomUUID(),
      org_id: data.org_id,
      pet_id: data.pet_id,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      created_at: new Date(),
    }

    this.adoptions.push(adoption)

    return adoption
  }

  async findById(id: string): Promise<Adoption | null> {
    const adoption = this.adoptions.find((adoption) => {
      return adoption.id === id
    })

    if (!adoption) return null

    return adoption
  }

  async findByPetId(petId: string) {
    const adoption = this.adoptions.find((adoption) => {
      return adoption.pet_id === petId
    })

    if (!adoption) return null

    return adoption
  }

  async findManyPets() {
    const pets = this.adoptions.map((adoption) => {
      return adoption.pet_id
    })

    return pets
  }
}
