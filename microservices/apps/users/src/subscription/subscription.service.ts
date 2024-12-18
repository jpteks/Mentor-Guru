import { Types } from 'mongoose';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from '../schemas/User.schema';
import { Subscription } from '../schemas/Subscription.schema';
import { Payment } from '../schemas/Payment.schema';
import { Plan } from '../schemas/Plan.schema';
import { createSubscriptionDto } from '../dto/createSubscription.dto';
@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Plan.name) private readonly planModel: Model<Plan>,
  ) {}

  async createSubscription(
    userId: string,
    createSubscriptionDto: createSubscriptionDto,
  ): Promise<{ statusCode: number; message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      };
    const plan = await this.planModel.findOne({
      packageName: createSubscriptionDto.packageName,
    });
    if (!plan)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Plan not found',
      };
    const expiresAt = new Date();
    // expiresAt.setDate(expiresAt.getDate() + 30);
    expiresAt.setMinutes(expiresAt.getMinutes() + 3);
    const subscription = new this.subscriptionModel({
      user: user._id,
      plan: plan._id,
      payment: null,
      subscriptionDate: new Date()
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19),
      expirationDate:
        createSubscriptionDto.packageName == 'Free' ? null : expiresAt,
    });
    await subscription.save();
    const payment = new this.paymentModel({
      user: user._id,
      subscription: subscription._id,
      amount:
        createSubscriptionDto.packageName == 'Free'
          ? 0
          : createSubscriptionDto.packageName == 'Basic'
            ? 6000
            : 7000,
      status: 'completed',
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });

    await payment.save();
    await this.subscriptionModel.updateOne(
      { _id: user._id },
      { $set: { payment: payment._id } },
    );
    await user.populate(
      'subscription',
      'packageName subscriptionDate expirationDate ',
    );
    await user.save();
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Subscription created',
    };
  }

  async getUserAccessRights(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const subscription = await this.subscriptionModel
      .findOne({ user: userObjectId })
      .populate('user', 'username  phoneNumber ')
      .populate('plan')
      .populate('payment', 'amount status paymentMethod paymentDate')
      .exec();
    if (!subscription) {
      throw new NotFoundException('Subscription not found for the user');
    }

    return subscription;
  }
  async updateSubscription(
    userId: string,
    updateSubscriptionDto: any,
  ): Promise<{ statusCode: number; message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User not found',
      };
    }

    const subscription = await this.subscriptionModel.findOne({
      user: user._id,
    });
    if (!subscription) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'No existing subscription found',
      };
    }

    const plan = await this.planModel.findOne({
      packageName: updateSubscriptionDto.packageName,
    });
    if (!plan) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Plan not found',
      };
    }

    // Set expiration date for paid packages
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
          subscriptionDate: new Date()
            .toISOString()
            .replace('T', ' ')
            .substring(0, 19),
        },
      },
      { new: true },
    );
    const paymentAmount =
      updateSubscriptionDto.packageName === 'Free'
        ? 0
        : updateSubscriptionDto.packageName === 'Basic'
          ? 6000
          : 7000;
    const payment = new this.paymentModel({
      user: user._id,
      subscription: updatedSubscription._id,
      amount: paymentAmount,
      status: 'completed',
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });

    await payment.save();
    await this.subscriptionModel.updateOne(
      { _id: subscription._id },
      {
        $set: {
          payment: payment._id,
        },
      },
    );
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          subscription: updatedSubscription._id,
          plan: plan._id,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Subscription updated successfully',
    };
  }
  async deleteSubscription(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('subscription')
      .exec();
    if (!user || !user.subscription)
      throw new NotFoundException('User or subscription not found');

    await this.subscriptionModel.findByIdAndDelete(user.subscription._id);
    user.subscription = null;
    await user.save();
  }
  async getAllSubscriptions(
    offset: number = 0,
    ITEMS_PER_PAGE: number = 8,
    query: string = '',
  ) {
    try {
      const filters: Record<string, any> = {};

      if (query) {
        filters.$or = [
          { 'user.username': { $regex: query, $options: 'i' } },
          { 'user.email': { $regex: query, $options: 'i' } },
          { 'user.phoneNumber': { $regex: query, $options: 'i' } },
          { 'payment.amount': { $regex: query, $options: 'i' } },
          { 'payment.status': { $regex: query, $options: 'i' } },
          { 'payment.paymentMethod': { $regex: query, $options: 'i' } },
          { 'payment.paymentDate': { $regex: query, $options: 'i' } },
        ];
      }

      if (offset < 0) offset = 0;

      const totalSubscribers =
        await this.subscriptionModel.countDocuments(filters);

      const totalPages = Math.ceil(totalSubscribers / ITEMS_PER_PAGE);

      const subscribers = await this.subscriptionModel
        .find(filters)
        .populate('user', 'username email phoneNumber') // Select specific fields
        .populate('plan')
        .populate('payment', 'amount status paymentMethod paymentDate')
        .skip(offset)
        .limit(ITEMS_PER_PAGE)
        .exec();

      return {
        subscribers,
        totalPages,
        totalSubscribers,
      };
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw new Error('Failed to fetch subscriptions. Please try again later.');
    }
  }

  async checkSubscriptionAccess(userId: string): Promise<void> {
    const subscription = await this.subscriptionModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate('plan')
      .exec();

    if (!subscription) {
      throw new ForbiddenException('No active subscription found.');
    }

    const currentDate = new Date();
    if (
      subscription.expirationDate &&
      subscription.expirationDate < currentDate
    ) {
      throw new ForbiddenException(
        'Your subscription has expired. Please renew to continue accessing.',
      );
    }

    if (subscription.plan.packageName === 'Free') {
      return;
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateExpiredSubscriptions() {
    const currentDate = new Date();

    const expiredSubscriptions = await this.subscriptionModel
      .find({
        expirationDate: { $lt: currentDate },
        'plan.packageName': { $ne: 'Free' },
      })
      .populate('plan')
      .exec();
    console.log(expiredSubscriptions);

    const freePlan = await this.planModel
      .findOne({ packageName: 'Free' })
      .exec();
    if (!freePlan) {
      console.log('Free plan not found. Exiting cron job.');
      return;
    }

    for (const subscription of expiredSubscriptions) {
      const newPayment = new this.paymentModel({
        user: subscription.user,
        subscription: subscription._id,
        amount: 0,
        status: 'completed',
        paymentMethod: 'cash',
        paymentDate: new Date()
          .toISOString()
          .replace('T', ' ')
          .substring(0, 19),
      });
      await newPayment.save();
      await this.subscriptionModel.updateOne(
        { _id: subscription._id },
        {
          $set: {
            plan: freePlan._id,
            expirationDate: null,
            Payment: newPayment._id,
          },
        },
      );
      await this.userModel.updateOne(
        { _id: subscription.user },
        {
          $set: {
            plan: freePlan._id,
          },
        }
      );
      console.log(subscription);
    }
  }
}
