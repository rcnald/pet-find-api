import { PrismaAdoptionsRepository } from "@/repositories/prisma/prisma-adoptions-repository"
import { CreateAdoptionUseCase } from "../create-adoption"

export function makeCreateAdoptionUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()
  const useCase = new CreateAdoptionUseCase(adoptionsRepository)

  return useCase
}
