import { CreateOrgParams, OrgsRepository } from "../orgs-repository"
import { prisma } from "@/lib/prisma"

export class PrismaOrgRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async create(data: CreateOrgParams) {
    const org = await prisma.org.create({
      data: {
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
