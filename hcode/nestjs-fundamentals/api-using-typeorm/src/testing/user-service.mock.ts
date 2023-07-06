import { UserService } from "../user/user.service";
import { userEntityList } from "./user-entity-list.mock";

export const userServiceMock = {
    provide: UserService,
    useValue: {
        exists: jest.fn().mockResolvedValue(true),
        create: jest.fn().mockResolvedValue(userEntityList[0]),
        read: jest.fn().mockResolvedValue(userEntityList),
        readOne: jest.fn().mockResolvedValue(userEntityList[0]),
        updateAllInfo: jest.fn().mockResolvedValue(userEntityList[0]),
        updateSomeInfo: jest.fn().mockResolvedValue(userEntityList[0]),
        delete: jest.fn().mockResolvedValue(true)
    }
}