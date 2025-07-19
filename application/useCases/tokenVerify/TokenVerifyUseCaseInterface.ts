import {TokenVerify} from "@/domain/entities/TokenVerify";

export interface TokenVerifyUseCaseInterface {
    findTokenById(id: number): Promise<TokenVerify | null>;
    createTokenVerifyForEmail(email: string): Promise<TokenVerify>;
    tokenValidForCreateUser(creation_id: number): Promise<TokenVerify>
}