// payment.controller.ts
import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../decorator/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { UserRole } from '../schemas/User.schema';
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    const userRole = request.user.role;
    if (userRole === UserRole.STUDENT) {
      return {
        message: 'Access denied. You can only view your own information.',
      };
    }
    return this.paymentService.findOne(id);
  }
}
