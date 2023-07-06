import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'User One',
    email: 'userone@email.com',
    password: '$2b$10$/GyHvTo7s9VGjf0wWOWi/uIW6UJyqKjOA85MmoSo4Z6CKcoRuA55a',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'User Two',
    email: 'usertwo@email.com',
    password: '$2b$10$aWWmjNM9W6jYfKITOWfe9uEeQTU9ogepFAeIAYJHltBPuWs7n2Hom',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'User Three',
    email: 'userthree@email.com',
    password: '$2b$10$aWWmjNM9W6jYfKITOWfe9uEeQTU9ogepFAeIAYJHltBPuWs7n2Two',
    role: Role.User,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
