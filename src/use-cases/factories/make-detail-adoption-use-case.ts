import { PrismaAdoptionsRepository } from "@/repositories/prisma/prisma-adoptions-repository"
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { DetailAdoptionUseCase } from "../detail-adoption"

export function makeDetailAdoptionUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new DetailAdoptionUseCase(
    adoptionsRepository,
    petsRepository,
    orgsRepository,
  )

  return useCase
}
