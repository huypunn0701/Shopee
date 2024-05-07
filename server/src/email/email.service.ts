import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
@Injectable()
export class EmailService {
  async sendEmail(email: string, res): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vanduc1212@gmail.com',
          pass: 'cywubprdxbwyxelj',
        },
      });
      const html_content = fs.readFileSync(
        'D:/Học Tập/Project_MD05/Shopee MD05/server/src/email/template.html',
        'utf8',
      );
      const mailOptions = {
        from: 'vanduc1212@gmail.com',
        to: email,
        subject: 'Shoppe',
        html: html_content,
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({});
    } catch (error) {
      console.error('Error sending forget password email:', error);
      throw new Error('Failed to send the forget password email.');
    }
  }

  async sendEmailShop(email: string, res): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vanduc1212@gmail.com',
          pass: 'cywubprdxbwyxelj',
        },
      });
      const html_content = fs.readFileSync(
        'D:/Học Tập/Project_MD05/Shopee MD05/server/src/email/shop.html',
        'utf8',
      );
      const mailOptions = {
        from: 'vanduc1212@gmail.com',
        to: email,
        subject: 'Shoppe',
        html: html_content,
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({});
    } catch (error) {
      console.error('Error sending forget password email:', error);
      throw new Error('Failed to send the forget password email.');
    }
  }
}