import { Test, TestingModule } from "@nestjs/testing"
import { MailerService } from "./mailer.service"

describe('MailerService', () => {

    let mailerService: MailerService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MailerService]
        }).compile()

        
        mailerService = module.get<MailerService>(MailerService)
    })

    it('Should validate if modules are defined', () => {
        expect(mailerService).toBeDefined()
    })

    it('Should validate if sendEmail method is working', async () => {
        const result = await mailerService.sendEmail()
    })
})