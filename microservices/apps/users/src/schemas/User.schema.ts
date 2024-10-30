import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false, minlength: 3 })
  username: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  region: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ type: String, enum: ['active', 'inactive'], default: 'inactive' })
  accountStatus: string;

  @Prop({ type: Number, default: null })
  otp: number;

  @Prop({ type: Date, default: null })
  otpExpiry: Date;

  @Prop({ type: String, enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
