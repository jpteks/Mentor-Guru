import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CloudinaryService } from './cloudinary.service';
import { ConfigifyModule } from '@itgorillaz/configify';
import { UploadConfiguration } from './config/upload.configuration';
import { port } from '@app/contracts/port';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    ClientsModule.registerAsync([
      {
        name: 'COURSES_SERVICE',
        useFactory: async (coursesTransportConfig: UploadConfiguration) => ({
          transport: Transport.TCP,
          options: {
            host: coursesTransportConfig.host || 'localhost',
            port: port.COURSES,
          },
        }),
        inject: [UploadConfiguration],
      },
    ]),
  ],
  providers: [CoursesService, CloudinaryService],
  controllers: [CoursesController],
})
export class CoursesModule {}
