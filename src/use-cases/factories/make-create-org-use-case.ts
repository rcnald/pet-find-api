import { PrismaOrgRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { CreateOrgUseCase } from "../create-org"

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgRepository()
  const useCase = new CreateOrgUseCase(orgRepository)

  return useCase
}
