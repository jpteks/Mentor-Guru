import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../user/user.controller';
import { UserSchema } from '../schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionModule } from '../subscription/subscription.module';
import { SubscriptionSchema } from '../schemas/Subscription.schema';
import { PlanSchema } from '../schemas/Plan.schema';
import { PaymentSchema } from '../schemas/Payment.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
    forwardRef(() => SubscriptionModule),
    MongooseModule.forFeature([{ name: 'Plan', schema: PlanSchema }]),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  exports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    //     {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class UserModule {}
