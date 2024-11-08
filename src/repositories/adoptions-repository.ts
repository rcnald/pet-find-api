import { Adoption, Independence, Pet, Prisma, Size, Type } from "@prisma/client"

export interface FindManyPetsParams {
  city: string
  state: string
  age?: number
  size?: Size
  energy_level?: number
  independence_level?: Independence
  type?: Type
}

export type FetchedPet = Pick<Pet, "id" | "name" | "type">

export interface AdoptionsRepository {
  create(data: Prisma.AdoptionUncheckedCreateInput): Promise<Adoption>
  findByPetId(petId: string): Promise<Adoption | null>
  findManyPets(): Promise<Array<string>>
}
