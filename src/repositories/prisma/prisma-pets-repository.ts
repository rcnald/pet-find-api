import { prisma } from "@/lib/prisma"
import {
  CreatePetParams,
  FetchedPet,
  FindManyPetsParams,
  PetsRepository,
} from "../pets-repository"

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: CreatePetParams) {
    const pet = await prisma.pet.create({
      data: {
        age: data.age,
        name: data.name,
        size: data.size,
        type: data.type,
        bio: data.bio,
        breed: data.breed,
        energy_level: data.energy_level,
        independence_level: data.independence_level,
        medical_info: data.medical_info,
        space_needs: data.space_needs,
        address: {
          create: {
            city: data.city,
            neighborhood: data.city,
            number: data.number,
            state: data.state,
            street: data.street,
            zip_code: data.zip_code,
          },
        },
      },
    })

    return pet
  }

  async findMany(data: FindManyPetsParams): Promise<FetchedPet[]> {
    const petsInTheCity = await prisma.pet.findMany({
      where: {
        id: {
          in: data.pets_id,
        },
        address: {
          city: data.city,
          state: data.state,
        },
      },
    })

    const pets = petsInTheCity
      .map((pet) => {
        let matchScore = 0

        if (pet.age === data.age) matchScore += 1
        if (pet.energy_level === data.energy_level) matchScore += 1
        if (pet.independence_level === data.independence_level) matchScore += 1
        if (pet.size === data.size) matchScore += 1
        if (pet.type === data.type) matchScore += 1

        return {
          name: pet.name,
          id: pet.id,
          type: pet.type,
          matchScore,
        }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .map((pet) => {
        return { id: pet.id, name: pet.name, type: pet.type }
      })

    return pets
  }
}
