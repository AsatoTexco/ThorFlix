import {UserUseCase} from "@/application/useCases/user/UserUseCase";
import {UserGateway} from "@/application/useCases/gateways/UserGateway";
import {UserRepositoryGateway} from "@/infrastructure/gateways/UserRepositoryGateway";
import {TokenVerifyUseCase} from "@/application/useCases/tokenVerify/TokenVerifyUseCase";
import {TokenVerifyRepositoryGateway} from "@/infrastructure/gateways/TokenVerifyRepositoryGateway";
import {TokenVerifyGateway} from "@/application/useCases/gateways/TokenVerifyGateway";
import {UserRepository} from "@/infrastructure/repositories/UserRepository";
import {UserEntityDomainMapper} from "@/infrastructure/mappers/user/UserEntityDomainMapper";
import {TokenVerifyRepository} from "@/infrastructure/repositories/TokenVerifyRepository";


export const userRepository = new UserRepository()
export const tokenVerifyRepository = new TokenVerifyRepository()

const userGateway: UserGateway = new UserRepositoryGateway(userRepository)
const tokenVerifyGateway: TokenVerifyGateway = new TokenVerifyRepositoryGateway(tokenVerifyRepository)


export const tokenVerifyUseCase = new TokenVerifyUseCase(tokenVerifyGateway)
export const userUseCase = new UserUseCase(userGateway, tokenVerifyUseCase)
