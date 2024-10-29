import { OrgAlreadyExists } from "@/use-cases/error/org-already-exists-error"
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createORGBodySchema = z.object({
    responsible: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string().min(11),
    residencial_number: z.string(),
    state: z.string().min(2),
    street: z.string(),
    city: z.string(),
    zip_code: z.string().min(8),
    neighborhood: z.string(),
  })

  const {
    city,
    email,
    neighborhood,
    password,
    phone,
    residencial_number,
    responsible,
    state,
    street,
    zip_code,
  } = createORGBodySchema.parse(req.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    await createOrgUseCase.execute({
      city,
      email,
      neighborhood,
      password,
      phone,
      residencial_number,
      responsible,
      state,
      street,
      zip_code,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExists) {
      return rep.status(409).send({ message: err.message })
    }
  }

  return rep.status(201).send()
}
