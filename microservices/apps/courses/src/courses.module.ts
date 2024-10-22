import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { ConfigifyModule } from '@itgorillaz/configify';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfiguration } from './config/db.configuration';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    // Necessary for initiating the db connection by passing uri connection string
    MongooseModule.forRootAsync({
      useFactory: async (dbConfig: dbConfiguration) => ({
        uri: 'mongodb://meta:meta@coursesDB:27017/coursesDB?authSource=admin' /*|| dbConfig.DB_METADATA_URL || dbConfig.coursesDB*/,
      }),
      inject: [dbConfiguration],
    }),
    // Use to inject the schema into the the db
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
