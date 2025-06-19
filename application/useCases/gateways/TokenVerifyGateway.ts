import {TokenVerify} from "@/domain/entities/TokenVerify";

export interface TokenVerifyGateway{
    findTokenVerifyByID(id: number): Promise<TokenVerify>;
    findTokenVerifyByIDAndTfToken(id: number, tf_token: string): Promise<any>;
}