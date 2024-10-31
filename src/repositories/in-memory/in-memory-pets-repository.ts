import { Address, Pet } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { CreatePetParams, PetsRepository } from "../pets-repository"

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
}
