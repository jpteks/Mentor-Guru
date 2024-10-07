import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDTO } from '@app/contracts/courses/create-course.dto';
import { UpdateCourseDTO } from '@app/contracts/courses/update-course.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDTO): Promise<Course & Document> {
    const { authorId, title, subject } = createCourseDto;

    // Check if a course with the same title and subject exists for the author
    const existingCourse = await this.courseModel.findOne({
      authorId,
      title,
      subject,
    });

    if (existingCourse) {
      // Mark new course as an updated version
      createCourseDto.isUpdatedVersion = true;

      // Mark the old course as no longer the latest version
      await this.courseModel.updateOne(
        { _id: existingCourse._id },
        { isUpdatedVersion: false },
      );
    } else {
      // First version of the course
      createCourseDto.isUpdatedVersion = true;
    }

    // Create and save the new course
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll() {
    try {
      return await this.courseModel.find();
    } catch (error) {
      throw new RpcException(`Failed to retrieve courses: ${error.message}`);
    }
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new RpcException('Course Not Found wrong id');
    }

    return course;
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new RpcException('Course Not Found wrong id');
    }
    try {
      return await this.courseModel.updateMany(
        { _id: id },
        {
          title: updateCourseDTO.title,
          subject: updateCourseDTO.subject,
          description: updateCourseDTO.description,
        },
      );
    } catch (error) {
      throw new RpcException(`Failed to update course: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ deletedCount: number }> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new RpcException('Course Not Found wrong id');
    }
    try {
      return await this.courseModel.deleteOne({ _id: id });
    } catch (error) {
      throw new RpcException(`Failed to delete course: ${error.message}`);
    }
  }
}
