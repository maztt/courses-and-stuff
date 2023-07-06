import { Role } from '../enums/role.enum';
import { UpdatePatchUserDTO } from '../user/dto/update-patch-user.dto';

export const updatePatchUserDTOMock: UpdatePatchUserDTO = {
  name: '',
  email: '',
  password: '',
  role: Role.Admin,
};
