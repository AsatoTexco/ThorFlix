import prisma from "@/utils/prisma";
import {users} from "@/prisma/prisma";

export class UserRepository{

    async findUserByEmail(email: string): Promise<users | null>{
        return prisma.users.findFirst({
            where: {
                email:email
            }
        })
    }



}