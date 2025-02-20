import { ResourceNotFoundError } from "@/use-cases/error/resource-not-found-error"
import { makeDetailAdoptionUseCase } from "@/use-cases/factories/make-detail-adoption-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function detail(req: FastifyRequest, rep: FastifyReply) {
  const detailAdoptionParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = detailAdoptionParamsSchema.parse(req.params)

  try {
    const detailAdoptionUseCase = makeDetailAdoptionUseCase()

    const { adoption } = await detailAdoptionUseCase.execute({ pet_id })

    return rep.status(200).send({ adoption })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }
  }
}
