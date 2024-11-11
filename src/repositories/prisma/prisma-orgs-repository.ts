import { CreateOrgParams, OrgsRepository } from "../orgs-repository"
import { prisma } from "@/lib/prisma"

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({ where: { id } })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async create(data: CreateOrgParams) {
    const org = await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        phone: data.phone,
        responsible: data.responsible,
        address: {
          create: {
            city: data.city,
            neighborhood: data.neighborhood,
            street: data.street,
            number: data.number,
            state: data.state,
            zip_code: data.zip_code,
          },
        },
      },
    })

    return org
  }
}
