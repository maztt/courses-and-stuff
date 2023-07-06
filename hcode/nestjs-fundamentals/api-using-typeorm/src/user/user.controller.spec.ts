import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { guardMock } from '../testing/guard.mock';
import { UserService } from './user.service';
import { createUserDTOMock } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { updatePutUserDTOMock } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTOMock } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Should validate if modules are defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Guards for UserController', () => {
    it('Should validate if AuthGuard and RoleGuard are both operating in correct sequence', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    it('Should validate if create method is working', async () => {
      const result = await userController.create(createUserDTOMock);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    it('Should validate if read method is working', async () => {
      const result = await userController.read();
      expect(result).toEqual(userEntityList);
    });

    it('Should validate if readOne method is working', async () => {
      const result = await userController.readOne(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    it('Should validate if updateAllInfo method is working', async () => {
      const result = await userController.updateAllInfo(
        1,
        updatePutUserDTOMock,
      );
      expect(result).toEqual(userEntityList[0]);
    });

    it('Should validate if updateSomeInfo method is working', async () => {
      const result = await userController.updateSomeInfo(
        1,
        updatePatchUserDTOMock,
      );
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    it('Should validate if delete method is working', async () => {
      const result = await userController.delete(1);
      expect(result).toEqual({ success: true });
    });
  });
});
