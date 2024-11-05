import { PetIsAlreadyUpForAdoptionError } from "@/use-cases/error/pet-is-already-up-for-adoption-error"
import { makeCreateAdoptionUseCase } from "@/use-cases/factories/make-create-adoption-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createAdoptionBodySchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = createAdoptionBodySchema.parse(req.body)

  try {
    const createAdoptionUseCase = makeCreateAdoptionUseCase()

    await createAdoptionUseCase.execute({
      org_id: req.user.sub,
      pet_id,
    })

    return rep.status(201).send()
  } catch (err) {
    if (err instanceof PetIsAlreadyUpForAdoptionError) {
      return rep.status(409).send({ message: err.message })
    }
  }
}
