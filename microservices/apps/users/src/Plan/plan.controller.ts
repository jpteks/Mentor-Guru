import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../decorator/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { UserRole } from '../schemas/User.schema';
import { Controller, Post, Body, Put, Param, Get, Delete,UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from '../dto/plan.dto';
import { Plan } from '../schemas/Plan.schema';

@Controller('plans')
@UseGuards(JwtAuthGuard)
export class PlanController {
  constructor(private readonly planService: PlanService) {}


  @Post('create')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
    return this.planService.create(createPlanDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updatePlanDto: CreatePlanDto
  ): Promise<Plan> {
    return this.planService.update(id, updatePlanDto);
  }
  
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Plan> {
    return this.planService.findOne(id);
  }

 
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.planService.remove(id);
  }

  
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<Plan[]> {
    return this.planService.findAll();
  }
}
