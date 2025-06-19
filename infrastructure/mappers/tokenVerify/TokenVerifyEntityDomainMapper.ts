import {token_verify} from "@/prisma/prisma";
import {TokenVerify} from "@/domain/entities/TokenVerify";

export class TokenVerifyEntityDomainMapper {

    public static toDomain(token_verify: token_verify): TokenVerify {
        if(token_verify == null){
            return null
        }
        return TokenVerify.create(token_verify.email, token_verify.status, token_verify.tf_token)
    }

    // toTokenVerifyEntity(tokenVerify: TokenVerify): token_verify {


}