import {UserUseCaseInteface} from "@/application/useCases/user/UserUseCaseInteface";
import {User} from "@/domain/entities/User";
import {UserGateway} from "@/application/useCases/gateways/UserGateway";
import {Perfil} from "@/domain/entities/Perfil";
import {TokenVerify} from "@/domain/entities/TokenVerify";
import {TokenVerifyUseCase} from "@/application/useCases/tokenVerify/TokenVerifyUseCase";
import {ConflictException} from "@/domain/exceptions/genericExceptions/ConflictException";

export class UserUseCase implements UserUseCaseInteface {



        constructor(
            private readonly userGateway:UserGateway,
            private readonly tokenVerifyUseCase:TokenVerifyUseCase
        ) {}

        async createUser(name: string, password: string, creation_id: number): Promise<User> {
                const tokenIsValid: TokenVerify = await this.tokenVerifyUseCase.tokenValidForCreateUser(creation_id)

                const userToCreate: User = User.create(name, tokenIsValid.email, password, "confirmed", new Date())

                if(tokenIsValid){
                        const userByEmail = await this.userGateway.findUserByEmail(userToCreate.email);
                        if(userByEmail != null) {
                                // inserir tratamento de erro customizada (class)
                                throw new ConflictException("Já existe um usuário com esse E-mail")
                        }
                        return await this.userGateway.createUser(userToCreate, Perfil.create("Principal"))
                }
        }

}