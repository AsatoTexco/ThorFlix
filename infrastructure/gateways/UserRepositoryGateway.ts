import {UserGateway} from "@/application/useCases/gateways/UserGateway";
import {User} from "@/domain/entities/User";
import {Perfil} from "@/domain/entities/Perfil";
import prisma from "@/utils/prisma";
import { status_user } from "@/prisma/prisma/client"
import {UserEntityDomainMapper} from "@/infrastructure/mappers/user/UserEntityDomainMapper"

export class UserRepositoryGateway implements UserGateway{

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

         const data = await prisma.users.findFirst({
             where: {
                 email:email
             }
         })

        if(data == null) return data
        return User.create(data.name, data.email, data.password, data.status, data.created_at)
     }


}