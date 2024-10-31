import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case"
import { Independence, Size, Space, Type } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    bio: z.string().nullable(),
    size: z.nativeEnum(Size),
    age: z.coerce.number(),
    type: z.nativeEnum(Type),
    breed: z.string().nullable(),
    medical_info: z.string().nullable(),
    energy_level: z.coerce.number(),
    space_needs: z.nativeEnum(Space),
    independence_level: z.nativeEnum(Independence),
    residencial_number: z.string(),
    state: z.string().min(2),
    street: z.string(),
    city: z.string(),
    zip_code: z.string().min(8),
    neighborhood: z.string(),
  })

  const {
    age,
    breed,
    energy_level,
    independence_level,
    medical_info,
    name,
    size,
    space_needs,
    type,
    bio,
    city,
    neighborhood,
    residencial_number,
    state,
    street,
    zip_code,
  } = createPetBodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    age,
    breed,
    energy_level,
    independence_level,
    medical_info,
    name,
    size,
    space_needs,
    type,
    bio,
    city,
    neighborhood,
    residencial_number,
    state,
    street,
    zip_code,
  })

  return rep.status(201).send()
}
