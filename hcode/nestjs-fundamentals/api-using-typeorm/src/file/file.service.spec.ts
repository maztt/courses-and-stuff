import { Test, TestingModule } from "@nestjs/testing"
import { FileService } from "./file.service"
import { getPhotoMock } from "../testing/get-photo.mock";

describe('FileService', () => {

    let fileService: FileService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FileService]
        }).compile()

        fileService = module.get<FileService>(FileService)
    })

    it('Should validate if modules are defined', () => {
        expect(fileService).toBeDefined()
    })

    it('Should validate if upload method is working', async () => {
        const photo = await getPhotoMock()
        const filename = 'photo-test.png'
        fileService.upload(photo, filename)
    })

})