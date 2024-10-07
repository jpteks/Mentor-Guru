import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CloudinaryService } from './cloudinary.service';
import { ConfigifyModule } from '@itgorillaz/configify';
import { port } from '@app/contracts/port';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    ClientsModule.register([
      {
        name: 'COURSES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: port.COURSES,
        },
      },
    ]),
  ],
  providers: [CoursesService, CloudinaryService],
  controllers: [CoursesController],
})
export class CoursesModule {}
