import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { FetchPetsUseCase } from "../fetch-pets"
import { PrismaAdoptionsRepository } from "@/repositories/prisma/prisma-adoptions-repository"

export function makeFetchPetsUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(adoptionsRepository, petsRepository)

  return useCase
}
