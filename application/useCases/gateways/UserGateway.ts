import {User} from "@/domain/entities/User";
import {Perfil} from "@/domain/entities/Perfil";
import {Prisma} from "@/prisma/prisma";

export interface UserGateway{
    createUser(user: User, perfil: Perfil): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}