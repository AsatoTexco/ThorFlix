import {User} from "@/domain/entities/User";

export interface UserUseCaseInteface {
    createUser(name: string, password: string, creation_id: number): Promise<User>;
}