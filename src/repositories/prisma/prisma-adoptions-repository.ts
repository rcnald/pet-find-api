import { Prisma } from "@prisma/client"
import { AdoptionsRepository } from "../adoptions-repository"
import { prisma } from "@/lib/prisma"

export class PrismaAdoptionsRepository implements AdoptionsRepository {
  async create(data: Prisma.AdoptionUncheckedCreateInput) {
    const adoption = await prisma.adoption.create({
      data: {
        pet_id: data.pet_id,
        org_id: data.org_id,
        adopted_at: data.adopted_at,
        created_at: data.created_at,
        id: data.id,
      },
    })
    return adoption
  }

  async findById(id: string) {
    const adoption = await prisma.adoption.findFirst({
      where: {
        id,
      },
    })

    return adoption
  }

  async findByPetId(petId: string) {
    const adoption = await prisma.adoption.findFirst({
      where: {
        pet_id: petId,
      },
    })

    return adoption
  }

  async findManyPets(): Promise<Array<string>> {
    const petsId = await prisma.adoption.findMany({
      where: { adopted_at: null },
      select: {
        pet_id: true,
      },
    })

    return petsId.map((petsId) => petsId.pet_id)
  }
}
