import { COURSES_PATTERNS } from '@app/contracts/courses/courses.patterns';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CreateCourseDTO } from './dto/create-course.dto';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class CoursesService {
  constructor(@Inject('COURSES_SERVICE') private courseClient: ClientProxy) {}

  createCourse(createCourseDTO: CreateCourseDTO): Observable<any> {
    const payload = createCourseDTO;
    return this.courseClient.send(COURSES_PATTERNS.CREATE, payload).pipe(
      catchError((error) => {
        throw new InternalServerErrorException(` ${error.message} `);
      }),
    );
  }

  getCourses() {
    return this.courseClient.send(COURSES_PATTERNS.FIND_ALL, {}).pipe(
      catchError((error) => {
        throw new ForbiddenException(` ${error.message} `);
      }),
    );
  }

  getCourse(id: string) {
    return this.courseClient.send(COURSES_PATTERNS.FIND_ONE, id).pipe(
      catchError((error) => {
        throw new BadRequestException(`${error.message} `);
      }),
    );
  }

  update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const { description, title, subject } = updateCourseDTO;
    return this.courseClient
      .send(COURSES_PATTERNS.UPDATE, {
        id,
        description,
        title,
        subject,
      })
      .pipe(
        catchError((error) => {
          throw new InternalServerErrorException(` ${error.message} `);
        }),
      );
  }

  remove(id: string) {
    return this.courseClient.send(COURSES_PATTERNS.REMOVE, id).pipe(
      catchError((error) => {
        throw new ForbiddenException(` ${error.message} `);
      }),
    );
  }
}
