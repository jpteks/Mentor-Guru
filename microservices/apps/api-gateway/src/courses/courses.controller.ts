import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CreateCourseDTO } from './dto/create-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('')
  @UseInterceptors(FileInterceptor('thumbnail')) // Capture file upload
  async createCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCourseDTO: CreateCourseDTO,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    try {
      // Generate a custom name for the image
      const customName = `${file.originalname.split('.')[0]}_${Date.now()}`;

      // Step 1: Attempt to upload the image to Cloudinary
      const result = await this.cloudinaryService.uploadImage(
        file.buffer,
        customName,
      );

      // Step 2: Create course metadata including the image URL
      const coursePayload = {
        ...createCourseDTO,
        thumbnailUrl: result.secure_url,
        publicId: result.public_id,
      };

      // Step 3: Send the payload to the microservice
      return this.coursesService.createCourse(coursePayload);
    } catch (error) {
      throw new InternalServerErrorException(
        `Course creation failed: ${error.message}`,
      );
    }
  }

  @Get('')
  getCourses() {
    return this.coursesService.getCourses();
  }

  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this.coursesService.getCourse(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCourseDTO: UpdateCourseDTO,
  ) {
    return this.coursesService.update(id, updateCourseDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
