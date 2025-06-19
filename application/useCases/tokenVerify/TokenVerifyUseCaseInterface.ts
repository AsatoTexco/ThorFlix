import {TokenVerify} from "@/domain/entities/TokenVerify";

export interface TokenVerifyUseCaseInterface {
    findTokenById(id: number): Promise<TokenVerify | null>;
    createToken(tokenVerify: TokenVerify): TokenVerify;
    tokenValidForCreateUser(creation_id: number): Promise<TokenVerify>
}