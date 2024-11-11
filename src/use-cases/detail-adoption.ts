import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { OrgsRepository } from "@/repositories/orgs-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { Size, Space } from "@prisma/client"
import { ResourceNotFoundError } from "./error/resource-not-found-error"

export interface DetailAdoptionUseCaseRequest {
  pet_id: string
}

export interface DetailAdoptionUseCaseResponse {
  adoption: {
    id: string
    pet: {
      name: string
      bio: string | null
      energy_level: number
      size: Size
      space_needs: Space
      medical_info: string | null
      address_id: string
    }
    org: {
      id: string
      name: string
      address_id: string
      phone: string
    }
  }
}

export class DetailAdoptionUseCase {
  constructor(
    private adoptionsRepository: AdoptionsRepository,
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    pet_id,
  }: DetailAdoptionUseCaseRequest): Promise<DetailAdoptionUseCaseResponse> {
    const adoption = await this.adoptionsRepository.findByPetId(pet_id)

    if (!adoption) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.findById(adoption.pet_id)
    const org = await this.orgsRepository.findById(adoption.org_id)

    if (!pet || !org) {
      throw new ResourceNotFoundError()
    }

    return {
      adoption: {
        id: adoption.id,
        pet: {
          address_id: pet.address_id,
          bio: pet.bio,
          energy_level: pet.energy_level,
          medical_info: pet.medical_info,
          name: pet.name,
          size: pet.size,
          space_needs: pet.space_needs,
        },
        org: {
          address_id: org.address_id,
          id: org.id,
          name: org.name,
          phone: org.phone,
        },
      },
    }
  }
}
