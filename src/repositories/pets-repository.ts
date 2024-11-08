import { MakeOptional } from "@/lib/utils/make-optional"
import { Address, Independence, Pet, Size, Type } from "@prisma/client"

export type CreatePetParams = MakeOptional<Omit<Pet, "address_id">, "id"> &
  Omit<Address, "id">

export type FetchedPet = Pick<Pet, "id" | "name" | "type">

export interface FindManyPetsParams {
  pets_id: string[]
  city: string
  state: string
  age?: number
  size?: Size
  energy_level?: number
  independence_level?: Independence
  type?: Type
}

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  findMany(data: FindManyPetsParams): Promise<FetchedPet[]>
}
