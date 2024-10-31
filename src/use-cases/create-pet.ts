import { Independence, Pet, Size, Space, Type } from "@prisma/client"
import { PetsRepository } from "@/repositories/pets-repository"

interface CreatePetUseCaseRequest {
  name: string
  bio: string | null
  size: Size
  age: number
  type: Type
  breed: string | null
  medical_info: string | null
  energy_level: number
  space_needs: Space
  independence_level: Independence
  city: string
  neighborhood: string
  state: string
  street: string
  zip_code: string
  residencial_number: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    bio,
    breed,
    city,
    energy_level,
    independence_level,
    medical_info,
    name,
    neighborhood,
    residencial_number,
    size,
    space_needs,
    state,
    street,
    type,
    zip_code,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      bio,
      breed,
      city,
      energy_level,
      independence_level,
      medical_info,
      name,
      neighborhood,
      number: residencial_number,
      size,
      space_needs,
      state,
      street,
      type,
      zip_code,
    })

    return { pet }
  }
}
