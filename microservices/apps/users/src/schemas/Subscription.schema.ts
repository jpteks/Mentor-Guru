import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './User.schema';
import mongoose from 'mongoose';
import { Plan } from './Plan.schema';
import { Payment } from './Payment.schema';
@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Plan' })
  plan: Plan;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Payment' })
  payment: Payment;
  @Prop({ default: Date.now })
  subscriptionDate: Date;
  @Prop({ default: Date.now })
  expirationDate: Date;
}
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
