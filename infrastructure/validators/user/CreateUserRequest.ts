import { z } from "zod/v4"


export const createUserRequest = z.object({

    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres") ,
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    creation_id: z.number(),

})
export type CreateUserRequestType = z.infer<typeof createUserRequest>;
