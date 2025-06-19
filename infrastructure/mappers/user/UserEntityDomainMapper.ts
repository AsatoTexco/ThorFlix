import {users} from "@/prisma/prisma";
import {User} from "@/domain/entities/User";

export class UserEntityDomainMapper {

    public static toDomain(user: users): User {
        return User.create(
            user.name,
            user.email,
            user.password,
            user.status,
            user.created_at
        )
    }

    // static toPrisma
}