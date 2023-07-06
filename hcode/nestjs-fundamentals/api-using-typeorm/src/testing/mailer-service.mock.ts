import { MailerService } from '../utils/mailer/mailer.service';

export const mailerServiceMock = {
  provide: MailerService,
  useValue: {
    sendEmail: jest.fn(),
  },
};
