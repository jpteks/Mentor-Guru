import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
import { COURSES_PATTERNS } from '@app/contracts/courses/courses.patterns';
import { CreateCourseDTO } from '@app/contracts/courses/create-course.dto';
import { Types } from 'mongoose';
import { UpdateCourseDTO } from '@app/contracts/courses/update-course.dto';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  //----------------------------------------------------------POST-----------------------------------------------------------

  @MessagePattern(COURSES_PATTERNS.CREATE)
  async create(@Payload() createCourseDTO: CreateCourseDTO) {
    const payload = createCourseDTO;
    const course = await this.coursesService.create(payload);

    return {
      success: true,
      data: {
        courseId: course._id,
      },
      message: 'Course created successfully',
    };
  }
  //----------------------------------------------------------GET-----------------------------------------------------------

  @MessagePattern(COURSES_PATTERNS.FIND_ALL)
  async findAll() {
    const courses = await this.coursesService.findAll();
    return {
      success: true,
      data: courses,
      message: 'Courses retrieved successfully',
    };
  }
  @MessagePattern(COURSES_PATTERNS.FIND_ONE)
  async findOne(@Payload() id: string) {
    console.log('id', id);

    if (!Types.ObjectId.isValid(id)) {
      throw new RpcException(`Invalid mongo ObjectId format for the id:${id}`);
    }
    const course = await this.coursesService.findOne(id);
    return {
      success: true,
      data: course,
      message: 'Course retrieved successfully',
    };
  }

  //----------------------------------------------------------PUT-----------------------------------------------------------

  @MessagePattern(COURSES_PATTERNS.UPDATE)
  async update(@Payload() updateCourseDTO: UpdateCourseDTO) {
    if (!Types.ObjectId.isValid(updateCourseDTO.id)) {
      throw new RpcException(
        `Invalid mongo ObjectId format for the id:${updateCourseDTO.id}`,
      );
    }
    const result = await this.coursesService.update(
      updateCourseDTO.id,
      updateCourseDTO,
    );
    return {
      success: true,
      message: 'Course updated successfully',
      data: result,
    };
  }
  //----------------------------------------------------------DELETE-----------------------------------------------------------

  @MessagePattern(COURSES_PATTERNS.REMOVE)
  async remove(@Payload() id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new RpcException(`Invalid mongo ObjectId format for the id:${id}`);
    }
    const result = await this.coursesService.remove(id);
    return {
      success: true,
      message: 'Course deleted successfully',
      data: result,
    };
  }
}
