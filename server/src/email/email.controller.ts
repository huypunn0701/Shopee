import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';
@Controller('send-email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("/lock-user")
  sendEmail(@Body('email') email: string, @Res() res: Response) {
    return this.emailService.sendEmail(email, res);
  }

  @Post("/lock-shop")
  sendEmailShop(@Body('email') email: string, @Res() res: Response) {
    return this.emailService.sendEmailShop(email, res);
  }
}
