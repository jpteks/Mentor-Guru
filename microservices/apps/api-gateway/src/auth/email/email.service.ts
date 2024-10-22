import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendOtpEmail(username:string,email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Mentor Guru OTP verification `,
      text: `Hello ${username} your otp code is ${otp}`,
    });
  }
  async sendPasswordResetEmail(email: string, resetLink: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Hello,</p>
             <p>You requested to reset your password. Please use the link below to reset your password:</p>
             <p><a href="${resetLink}">Reset Password</a></p>
             <p>If you did not request a password reset, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);
  }
}
