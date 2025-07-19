import {UserGateway} from "@/application/useCases/gateways/UserGateway";
import {User} from "@/domain/entities/User";
import {Perfil} from "@/domain/entities/Perfil";
import prisma from "@/utils/prisma";
import {status_user, users} from "@/prisma/prisma/client"
import {UserEntityDomainMapper} from "@/infrastructure/mappers/user/UserEntityDomainMapper"
import {UserRepository} from "@/infrastructure/repositories/UserRepository";

export class UserRepositoryGateway implements UserGateway{

    constructor(
        private readonly userRepository: UserRepository
    ) {}


     async createUser(user: User, perfil: Perfil): Promise<User> {

         return UserEntityDomainMapper.toDomain(await prisma.users.create({
             data: {
                 name: user.name,
                 status: user.status as status_user,
                 email: user.email,
                 created_at: user.created_at,
                 password: user.password,
                 perfis: {
                     create: {
                         nome: perfil.nome,
                         image: perfil.image,
                     }
                 }
             }
         }))

     }

    async findUserByEmail(email: string): Promise<User | null> {
        // converter dado para repository X
        // fazer a ação no repository #
        // converter dado para domain

        const data: users = await this.userRepository.findUserByEmail(email)
        if(data == null) return data
        return UserEntityDomainMapper.toDomain(data)
    }


}