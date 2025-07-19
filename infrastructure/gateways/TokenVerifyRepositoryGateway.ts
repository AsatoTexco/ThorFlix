import {TokenVerifyGateway} from "@/application/useCases/gateways/TokenVerifyGateway";
import prisma from "@/utils/prisma";
import {TokenVerifyEntityDomainMapper} from "@/infrastructure/mappers/tokenVerify/TokenVerifyEntityDomainMapper";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import {TokenVerifyRepository} from "@/infrastructure/repositories/TokenVerifyRepository";
import {token_verify} from "@/prisma/prisma";
import {tokenVerifyRepository} from "@/config/dependencies";

export class TokenVerifyRepositoryGateway implements TokenVerifyGateway{

        constructor(
            readonly tokenVerifyRepository: TokenVerifyRepository
        ) { }

        async findTokenVerifyByID(id: number): Promise<TokenVerify> {
            // passar pelo gateway
            return TokenVerifyEntityDomainMapper.toDomain(
                await prisma.token_verify.findUnique({
                    where: {id: id}
                })
            )

        }

        async findTokenVerifyByIDAndTfToken(id: number, tf_token: string): Promise<any> {
            // passar pelo gateway
            return prisma.token_verify.findUnique({
                where: {
                    id: id,
                    tf_token: tf_token
                }
            });
        }

        async createTokenVerify(tokenVerify: TokenVerify): Promise<TokenVerify> {
            // converter dado para repository X
            // fazer a ação no repository #
            // converter dado para domain #

            // AQUI É O GATEWAY ONDE VOU CONVERTER O RESULTADO DO REPOSITORY PARA O TokenVerifyPersistanceDTO (DTO criado para eu poder ter acesso ao id na camada de USECASE)

            const tokenVerifyCreated: token_verify = await tokenVerifyRepository.createTokenVerify(tokenVerify)
            return  TokenVerifyEntityDomainMapper.toDomain(tokenVerifyCreated)
        }
}