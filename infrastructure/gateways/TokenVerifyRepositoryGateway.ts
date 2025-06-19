import {TokenVerifyGateway} from "@/application/useCases/gateways/TokenVerifyGateway";
import prisma from "@/utils/prisma";
import {TokenVerifyEntityDomainMapper} from "@/infrastructure/mappers/tokenVerify/TokenVerifyEntityDomainMapper";
import {TokenVerify} from "@/domain/entities/TokenVerify";

export class TokenVerifyRepositoryGateway implements TokenVerifyGateway{


        async findTokenVerifyByID(id: number): Promise<TokenVerify> {

            return TokenVerifyEntityDomainMapper.toDomain(
                await prisma.token_verify.findUnique({
                    where: {id: id}
                })
            )

        }
        async findTokenVerifyByIDAndTfToken(id: number, tf_token: string): Promise<any> {

            return prisma.token_verify.findUnique({
                where: {
                    id: id,
                    tf_token: tf_token
                }
            });
        }
}