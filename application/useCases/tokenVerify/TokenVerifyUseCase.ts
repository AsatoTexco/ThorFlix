import {TokenVerifyUseCaseInterface} from "@/application/useCases/tokenVerify/TokenVerifyUseCaseInterface";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import {TokenVerifyGateway} from "@/application/useCases/gateways/TokenVerifyGateway";
import {NotFoundException} from "@/domain/exceptions/genericExceptions/NotFoundException";
import {BadRequestException} from "@/domain/exceptions/genericExceptions/BadRequestException";

export class TokenVerifyUseCase implements TokenVerifyUseCaseInterface {

    constructor(private readonly tokenVerifyGateway: TokenVerifyGateway) {
    }

    // implementar em breve
    createToken(tokenVerify: TokenVerify): TokenVerify {
        return TokenVerify.create("a@gmail.com",true, "1twiqaduiowqah")
    }

    async tokenValidForCreateUser(creation_id: number){

        const tokenVerify: TokenVerify = await this.tokenVerifyGateway.findTokenVerifyByID(creation_id)
        if(tokenVerify == null){
            throw new NotFoundException("Não existe nenhuma solicitação para seu cadastro")
        }
        if(!tokenVerify.status){
            throw new BadRequestException("Clique no link enviado no seu E-mail ou tente novamente")
        }
        return tokenVerify

    }


    async findTokenById(id: number): Promise<TokenVerify> {
        return await this.tokenVerifyGateway.findTokenVerifyByID(id)
    }
}