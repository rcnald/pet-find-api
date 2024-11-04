import { InvalidCredentialsError } from "@/use-cases/error/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await rep.jwtSign(
      {},
      {
        sign: { sub: org.id, expiresIn: "10m" },
      },
    )

    const refreshToken = await rep.jwtSign(
      {},
      {
        sign: { sub: org.id, expiresIn: "7d" },
      },
    )

    return rep
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }
  }
}
