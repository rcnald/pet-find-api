import { ResourceNotFoundError } from "@/use-cases/error/resource-not-found-error"
import { makeAdoptUseCase } from "@/use-cases/factories/make-adopt-use-case copy"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function adopt(req: FastifyRequest, rep: FastifyReply) {
  const detailAdoptionParamsSchema = z.object({
    adoption_id: z.string().uuid(),
  })

  const { adoption_id } = detailAdoptionParamsSchema.parse(req.params)

  try {
    const adoptUseCase = makeAdoptUseCase()

    const { adoption } = await adoptUseCase.execute({ adoption_id })

    return rep.status(200).send({ adoption })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return rep.status(404).send({ message: err.message })
    }
  }
}
