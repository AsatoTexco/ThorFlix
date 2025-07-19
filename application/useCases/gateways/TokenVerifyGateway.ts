import {TokenVerify} from "@/domain/entities/TokenVerify";
import {TokenVerifyPersistanceDTO} from "@/infrastructure/dtos/TokenVerifyPersistanceDTO";

export interface TokenVerifyGateway{
    findTokenVerifyByID(id: number): Promise<TokenVerify>;
    findTokenVerifyByIDAndTfToken(id: number, tf_token: string): Promise<TokenVerify>;
    createTokenVerify(tokenVerify: TokenVerify): Promise<TokenVerify>;
}