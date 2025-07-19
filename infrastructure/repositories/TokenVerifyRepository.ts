import {token_verify} from "@/prisma/prisma";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import prisma from "@/utils/prisma"


export class TokenVerifyRepository{

    async createTokenVerify(tokenVerify:TokenVerify): Promise<token_verify>{
        return prisma.token_verify.create({
            data:{
                email: tokenVerify.email,
                tf_token: tokenVerify.tf_token,
                status: tokenVerify.status
            }
        })
    }

}