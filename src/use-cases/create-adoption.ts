import { Adoption } from "@prisma/client"
import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { PetIsAlreadyUpForAdoptionError } from "./error/pet-is-already-up-for-adoption-error"

interface CreateAdoptionUseCaseRequest {
  pet_id: string
  org_id: string
  adopted_at?: Date | null
}

interface CreateAdoptionUseCaseResponse {
  adoption: Adoption
}

export class CreateAdoptionUseCase {
  constructor(private adoptionsRepository: AdoptionsRepository) {}

  async execute({
    org_id,
    pet_id,
  }: CreateAdoptionUseCaseRequest): Promise<CreateAdoptionUseCaseResponse> {
    const adoptionExists = await this.adoptionsRepository.findByPetId(pet_id)

    if (adoptionExists) {
      throw new PetIsAlreadyUpForAdoptionError()
    }

    const adoption = await this.adoptionsRepository.create({
      org_id,
      pet_id,
    })

    return { adoption }
  }
}
