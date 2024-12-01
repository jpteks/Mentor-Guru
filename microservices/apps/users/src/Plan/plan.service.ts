// plan.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from '../schemas/Plan.schema';
import { CreatePlanDto } from '../dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<Plan>) {}

  async create(createPlanDto: CreatePlanDto) {
    const newPlan = new this.planModel(createPlanDto);
    return newPlan.save();
  }

  async findAll(): Promise<Plan[]> {
    return this.planModel.find().exec();
  }

  async findOne(id: string): Promise<Plan> {
    return this.planModel.findById(id).exec();
  }

  async update(id: string, updatePlanDto: CreatePlanDto): Promise<Plan> {
    return this.planModel
      .findByIdAndUpdate(id, updatePlanDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.planModel.findByIdAndDelete(id).exec();
  }
}
