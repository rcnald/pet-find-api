import { MakeOptional } from "@/lib/utils/make-optional"
import { Org, Address } from "@prisma/client"

export type CreateOrgParams = MakeOptional<Omit<Org, "address_id">, "id"> &
  Omit<Address, "id">

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  create(data: CreateOrgParams): Promise<Org>
}
