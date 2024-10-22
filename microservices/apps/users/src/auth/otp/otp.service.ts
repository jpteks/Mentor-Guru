import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class OtpService {
  generateOtp() {
    return otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }
}
