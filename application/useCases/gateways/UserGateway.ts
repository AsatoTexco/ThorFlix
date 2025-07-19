import {User} from "@/domain/entities/User";
import {Perfil} from "@/domain/entities/Perfil";

export interface UserGateway{
    createUser(user: User, perfil: Perfil): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}