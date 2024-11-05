import { Adoption, Prisma } from "@prisma/client"

export interface AdoptionsRepository {
  create(data: Prisma.AdoptionUncheckedCreateInput): Promise<Adoption>
  findByPetId(petId: string): Promise<Adoption | null>
}
