import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTOMock: UpdatePutUserDTO = {
  name: 'User Four',
  email: 'userfour@email.com',
  password: 'userfour',
  role: Role.User,
};
