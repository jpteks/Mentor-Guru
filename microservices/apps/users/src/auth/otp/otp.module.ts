import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';

@Module({
  providers: [OtpService],
  exports: [OtpService], // Export so it can be used in other modules
})
export class OTPModule {}
