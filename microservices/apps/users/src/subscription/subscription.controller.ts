import { JwtAuthGuard } from '../guards/jwt.guard';
import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  UseGuards,
  Post,
  Request,
  Put,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Roles } from '../decorator/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { UserRole } from '../schemas/User.schema';
import { createSubscriptionDto } from '../dto/createSubscription.dto';
import { UpdateSubscriptionDto } from '../dto/updateSubscription.dto';
@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(':userId')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async create(
    @Param('userId') userId: string,
    @Body() createSubscriptionDto: createSubscriptionDto,
  ) {
    return this.subscriptionService.createSubscription(
      userId,
      createSubscriptionDto,
    );
  }
  @Put(':userId')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async update(
    @Param('userId') userId: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.updateSubscription(
      userId,
      updateSubscriptionDto,
    );
  }
  @Get('/access/:userId')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  async getSubscriptionAccess(
    @Param('userId') userId: string,
    @Request() request,
  ) {
    const userRole = request.user.role;

    if (userRole === UserRole.STUDENT && request.user.id !== userId) {
      return {
        message: 'Access denied. You can only view your own information.',
      };
    }
    return this.subscriptionService.checkSubscriptionAccess(userId);
  }
  @Get(':userId')
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  async getSubscription(@Param('userId') userId: string, @Request() request) {
    const userRole = request.user.role;

    if (userRole === UserRole.STUDENT && request.user.id !== userId) {
      return {
        message: 'Access denied. You can only view your own information.',
      };
    }
    return this.subscriptionService.getUserAccessRights(userId);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async getAllSubscriptions(
    @Body() payload: { offset: number; query: string },
  ) {
    console.log(payload.query);

    const ITEMS_PER_PAGE = 8;
    const currentPage = payload.offset || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    return this.subscriptionService.getAllSubscriptions(
      offset,
      ITEMS_PER_PAGE,
      payload.query,
    );
  }

  @Delete(':userId')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('userId') userId: string) {
    return this.subscriptionService.deleteSubscription(userId);
  }
}
