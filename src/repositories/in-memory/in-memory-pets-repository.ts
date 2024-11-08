import { Address, Pet } from "@prisma/client"
import { randomUUID } from "node:crypto"
import {
  CreatePetParams,
  FindManyPetsParams,
  PetsRepository,
} from "../pets-repository"

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  public addresses: Address[] = []

  async create(data: CreatePetParams) {
    const address: Address = {
      id: randomUUID(),
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
      state: data.state,
      zip_code: data.zip_code,
    }

    this.addresses.push(address)

    const pet: Pet = {
      id: randomUUID(),
      age: data.age,
      bio: data.bio,
      breed: data.breed,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      name: data.name,
      size: data.size,
      type: data.type,
      space_needs: data.space_needs,
      medical_info: data.medical_info,
      address_id: address.id,
    }

    this.pets.push(pet)

    return pet
  }

  async findMany(data: FindManyPetsParams) {
    const adoptablePets = this.pets.filter((pet) => {
      return data.pets_id.includes(pet.id)
    })

    const petsInTheCity = adoptablePets.filter((pet) => {
      const petAddress = this.addresses.find(
        (address) => address.id === pet.address_id,
      )
      const isPetInTheCity =
        petAddress?.city === data.city && petAddress?.state === data.state

      if (isPetInTheCity) {
        return pet
      }

      return null
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
