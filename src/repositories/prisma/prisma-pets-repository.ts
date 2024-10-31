import { prisma } from "@/lib/prisma"
import { CreatePetParams, PetsRepository } from "../pets-repository"

export class PrismaPetsRepository implements PetsRepository {
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
}
