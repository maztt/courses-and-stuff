import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";

export const createUserDTOMock: CreateUserDTO = {
    name: 'User Four',
    email: 'userfour@email.com',
    password: 'userfour',
    role: Role.User
}