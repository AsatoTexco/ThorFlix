import {UserUseCase} from "@/application/useCases/user/UserUseCase";
import {UserGateway} from "@/application/useCases/gateways/UserGateway";
import {UserRepositoryGateway} from "@/infrastructure/gateways/UserRepositoryGateway";
import {TokenVerifyUseCase} from "@/application/useCases/tokenVerify/TokenVerifyUseCase";
import {TokenVerifyRepositoryGateway} from "@/infrastructure/gateways/TokenVerifyRepositoryGateway";
import {TokenVerifyGateway} from "@/application/useCases/gateways/TokenVerifyGateway";


const userGateway: UserGateway = new UserRepositoryGateway()
const tokenVerifyGateway: TokenVerifyGateway = new TokenVerifyRepositoryGateway()


export const tokenVerifyUseCase = new TokenVerifyUseCase(tokenVerifyGateway)
export const userUseCase = new UserUseCase(userGateway, tokenVerifyUseCase)
