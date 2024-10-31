import { MakeOptional } from "@/lib/utils/make-optional"
import { Address, Pet } from "@prisma/client"

export type CreatePetParams = MakeOptional<Omit<Pet, "address_id">, "id"> &
  Omit<Address, "id">

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
}
