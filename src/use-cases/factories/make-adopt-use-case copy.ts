import { PrismaAdoptionsRepository } from "@/repositories/prisma/prisma-adoptions-repository"
import { AdoptUseCase } from "../adopt"

export function makeAdoptUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()

  const useCase = new AdoptUseCase(adoptionsRepository)

  return useCase
}
