import { Types } from 'mongoose';
import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/User.schema';
import { Subscription } from '../schemas/Subscription.schema';
import { Payment } from '../schemas/Payment.schema';
import { Plan } from '../schemas/Plan.schema';
import { createSubscriptionDto } from '../dto/createSubscription.dto';
import { UpdateSubscriptionDto } from '../dto/updateSubscription.dto';
@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>,
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Plan.name) private readonly planModel: Model<Plan>,
    
  ) {}

 
  async createSubscription(userId: string, createSubscriptionDto: createSubscriptionDto): Promise<{ statusCode: number; message: string; }> {
    const user = await this.userModel.findById(userId);
    if (!user) return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'User not found',
      
    };
    const plan = await this.planModel.findOne({ packageName: createSubscriptionDto.packageName});
    if (!plan) return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Plan not found',
      
    };
    const expiresAt = new Date();
    // expiresAt.setDate(expiresAt.getDate() + 30);
    expiresAt.setMinutes(expiresAt.getMinutes() + 3);
    const subscription = new this.subscriptionModel({
      user: user._id,
      plan: plan._id,
      payment:null,
      subscriptionDate: new Date().toISOString().split('T')[0],
      expirationDate: createSubscriptionDto.packageName=='Free'?null: expiresAt
    });
    await subscription.save();
    const payment = new this.paymentModel({
      user: user._id,
      subscription: subscription._id,
      amount: createSubscriptionDto.packageName=='Free'? 0 :createSubscriptionDto.packageName=='Basic'? 6000 :7000,
      status: 'completed',
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString().split('T')[0],
    });

    await payment.save();
    await this.subscriptionModel.updateOne(
      { _id: user._id },
      { $set: { payment: payment._id } },
    );
    await user.populate('subscription',  'packageName subscriptionDate expirationDate ' )
    await user.save();
    return  {
      statusCode: HttpStatus.CREATED,
      message: 'Subscription created',
      
    }
  }

async getUserAccessRights(userId: string) {
  const userObjectId = new Types.ObjectId(userId);
  const subscription = await this.subscriptionModel
    .findOne({user:userObjectId }) 
    .populate('user', 'username  phoneNumber ')
    .populate('plan')
    .populate('payment', 'amount status paymentMethod paymentDate')
    .exec();
  if (!subscription) {
    throw new NotFoundException('Subscription not found for the user');
  }
  return subscription
}
async updateSubscription(userId: string, updateSubscriptionDto: any): Promise<{ statusCode: number; message: string; }> {
  
  const user = await this.userModel.findById(userId);
  if (!user) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'User not found',
    };
  }


  const subscription = await this.subscriptionModel.findOne({ user: user._id });
  if (!subscription) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'No existing subscription found',
    };
  }


  const plan = await this.planModel.findOne({ packageName: updateSubscriptionDto.packageName });
  if (!plan) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Plan not found',
    };
  }


  let expirationDate = subscription.expirationDate;
  if (updateSubscriptionDto.packageName !== 'Free') {
    expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 3);  
  }


  const updatedSubscription = await this.subscriptionModel.findByIdAndUpdate(
    subscription._id, 
    {
      $set: {
        plan: plan._id,
        expirationDate: expirationDate,
        subscriptionDate: new Date().toISOString().split('T')[0],  
      },
    },
    { new: true }  
  );
  const paymentAmount = updateSubscriptionDto.packageName === 'Free' ? 0 : updateSubscriptionDto.packageName === 'Basic' ? 6000 : 7000;

  const payment = new this.paymentModel({
    user: user._id,
    subscription: updatedSubscription._id,
    amount: paymentAmount,
    status: 'completed',
    paymentMethod: 'cash',  
    paymentDate: new Date().toISOString().split('T')[0],
  });

  await payment.save();
  if (!updatedSubscription) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Failed to update subscription',
    };
  }
  await this.subscriptionModel.updateOne(
    { _id: user._id },
    { $set: { payment: payment._id } },
  );
  
  await updatedSubscription.save();


  await user.populate('subscription', 'packageName subscriptionDate expirationDate');
  await user.save();

  return {
    statusCode: HttpStatus.OK,
    message: 'Subscription updated successfully',
  };
}

async deleteSubscription(userId: string) {
    const user = await this.userModel.findById(userId).populate('subscription').exec();
    if (!user || !user.subscription) throw new NotFoundException('User or subscription not found');

    await this.subscriptionModel.findByIdAndDelete(user.subscription._id);
    user.subscription = null;  
    await user.save();
}

  
async getAllSubscriptions() {
    return await this.subscriptionModel.find().populate('user', 'username  phoneNumber ').exec();
  }
  
  async checkSubscriptionAccess(userId: string): Promise<void> {
    const subscription = await this.subscriptionModel
      .findOne({ user: userId })
      .populate('plan')
      .exec();

    if (!subscription) {
      throw new ForbiddenException('No active subscription found.');
    }

    const currentDate = new Date();
    if (subscription.expirationDate && subscription.expirationDate < currentDate) {
      throw new ForbiddenException('Your subscription has expired. Please renew to continue accessing.');
    }

    if (subscription.plan.packageName === 'Free') {
      return; 
    }

   
  }
}
