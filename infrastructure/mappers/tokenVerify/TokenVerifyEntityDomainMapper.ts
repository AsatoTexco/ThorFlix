import {token_verify} from "@/prisma/prisma";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import {TokenVerifyPersistanceDTO} from "@/infrastructure/dtos/TokenVerifyPersistanceDTO";

export class TokenVerifyEntityDomainMapper {

    public static toDomain(token_verify: token_verify): TokenVerify {
        if(token_verify == null){
            return null
        }
        return TokenVerify.create(token_verify.email, token_verify.status, token_verify.tf_token, token_verify.id.toString() )
    }

    // public static toTokenVerifyPersistanceDTO(tkv: token_verify): TokenVerifyPersistanceDTO{
    //     if(tkv == null) return null
    //
    //     return {
    //         tf_token: tkv.tf_token,
    //         confirmed_at: tkv.confirmed_at,
    //         created_at: tkv.created_at,
    //         email: tkv.email,
    //         id: tkv.id.toString()
    //     }
    // }


}