import { AdoptionsRepository } from "@/repositories/adoptions-repository"
import { FetchedPet, PetsRepository } from "@/repositories/pets-repository"
import { Independence, Size, Type } from "@prisma/client"

export interface FetchPetsUseCaseRequest {
  city: string
  state: string
  age?: number
  size?: Size
  energy_level?: number
  independence_level?: Independence
  type?: Type
}

export interface FetchPetsUseCaseResponse {
  pets: FetchedPet[]
}

export class FetchPetsUseCase {
  constructor(
    private adoptionsRepository: AdoptionsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    state,
    age,
    energy_level,
    independence_level,
    size,
    type,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets_id = await this.adoptionsRepository.findManyPets()

    const pets = await this.petsRepository.findMany({
      pets_id,
      city,
      state,
      age,
      energy_level,
      independence_level,
      size,
      type,
    })

    return { pets }
  }
}
