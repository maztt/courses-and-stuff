import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTOMock } from '../testing/create-user-dto.mock';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDTOMock } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTOMock } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('Should validate if modules are defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('Should validate if create method is working', async () => {
    jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);
    const result = await userService.create(createUserDTOMock);
    expect(result).toEqual(userEntityList[0]);
  });

  it('Should validate if read method is working', async () => {
    const result = await userService.read();
    expect(result).toEqual(userEntityList);
  });

  it('Should validate if readOne method is working', async () => {
    const result = await userService.readOne(1);
    expect(result).toEqual(userEntityList[0]);
  });

  it('Should validate if updateAllInfo method is working', async () => {
    const result = await userService.updateAllInfo(1, updatePutUserDTOMock);
    expect(result).toEqual(userEntityList[0]);
  });

  it('Should validate if updateSomeInfo method is working', async () => {
    const result = await userService.updateAllInfo(1, updatePatchUserDTOMock);
    expect(result).toEqual(userEntityList[0]);
  });

  it('Should validate if delete method is working', async () => {
    const result = await userService.delete(1);
    expect(result).toEqual(true);
  });
});
