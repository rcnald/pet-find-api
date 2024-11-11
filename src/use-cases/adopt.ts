import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { Adoption } from "@prisma/client"
import { ResourceNotFoundError } from "./error/resource-not-found-error"

export interface AdoptUseCaseRequest {
  adoption_id: string
}

export interface AdoptUseCaseResponse {
  adoption: Adoption
}

export class AdoptUseCase {
  constructor(private adoptionsRepository: AdoptionsRepository) {}

  async execute({
    adoption_id,
  }: AdoptUseCaseRequest): Promise<AdoptUseCaseResponse> {
    const adoption = await this.adoptionsRepository.findById(adoption_id)

    if (!adoption) {
      throw new ResourceNotFoundError()
    }

    adoption.adopted_at = new Date()

    return { adoption }
  }
}
