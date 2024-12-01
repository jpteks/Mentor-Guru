import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Subscription } from './Subscription.schema';
import { User } from './User.schema';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subscription' })
  subscription: Subscription;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop({
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: String, enum: ['momo', 'OM', 'cash'], default: 'cash' })
  paymentMethod: string;

  @Prop({ type: String })
  transactionId: string;

  @Prop({ type: Date })
  paymentDate: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
