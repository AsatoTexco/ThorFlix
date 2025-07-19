import {z} from "zod/v4"
export const verifyEmailSchema = z.object({
    email: z.email({
        error: "O E-mail é inválido"
    })
})

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;