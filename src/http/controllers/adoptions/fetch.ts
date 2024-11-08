import { makeFetchPetsUseCase } from "@/use-cases/factories/make-fetch-pets-use-case"
import { Independence, Size, Type } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function fetch(req: FastifyRequest, rep: FastifyReply) {
  const fetchQueryParamsSchema = z.object({
    city: z.string(),
    state: z.string(),
    size: z.nativeEnum(Size).optional(),
    type: z.nativeEnum(Type).optional(),
    age: z.coerce.number().optional(),
    energy_level: z.coerce.number().optional(),
    independence_level: z.nativeEnum(Independence).optional(),
  })

  const { city, state, age, energy_level, independence_level, size, type } =
    fetchQueryParamsSchema.parse(req.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    state,
    age,
    energy_level,
    independence_level,
    size,
    type,
  })

  return rep.status(200).send({ pets })
}
