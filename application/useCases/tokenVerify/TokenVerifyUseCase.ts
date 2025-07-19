import {TokenVerifyUseCaseInterface} from "@/application/useCases/tokenVerify/TokenVerifyUseCaseInterface";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import {TokenVerifyGateway} from "@/application/useCases/gateways/TokenVerifyGateway";
import {NotFoundException} from "@/domain/exceptions/genericExceptions/NotFoundException";
import {BadRequestException} from "@/domain/exceptions/genericExceptions/BadRequestException";
import {createHash} from "crypto";
import templateImplement from "@/utils/templateImplements";
import ConfirmarEmailLink from "@components/emails/confirmarEmailLink/ConfirmarEmailLink";

export class TokenVerifyUseCase implements TokenVerifyUseCaseInterface {

    constructor(private readonly tokenVerifyGateway: TokenVerifyGateway) {
    }

    // implementar em breve
    async createTokenVerifyForEmail(email: string): Promise<TokenVerify> {

        if(!email){
            throw new BadRequestException("Os seguintes campos são obrigatórios: email")
        }
        // criando hash hex - separar a responsabilidade depois
        const hash = createHash('md5');
        hash.update(email+Date().toString()+process.env.TF_TOKEN_RANDOM);
        const md5 = hash.digest('hex');

        const tokenVerifyForCreate = TokenVerify.create(
            email,false, md5
        )

        // AQUI ESTOU PRECISANDO O EMAIL PARA REALIZAR O ENVIO DE UM EMAIL(AINDA IREI FAZER A LOGICA DO ENVIO DO EMAIL)
        const tokenVerifyCreated: TokenVerify = await this.tokenVerifyGateway.createTokenVerify(tokenVerifyForCreate);


        const htmlContent = templateImplement(ConfirmarEmailLink,{
            link_conf_email:`${process.env.THORFLIX_HOST_URL}/account/newaccountverification?creation_id=${tokenVerifyCreated.id}&tf_token=${tokenVerifyCreated.tf_token}`
        })

        // SERA IMPLEMENTADO RabbitMQ here
        const response = await fetch(`${process.env.THORFLIX_HOST_URL}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                to: email,
                subject:"Verificação de e-mail de nova conta ThorFlix",
                html: htmlContent,
            })
        });

        return tokenVerifyCreated
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