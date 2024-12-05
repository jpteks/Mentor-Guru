import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { PdfExtractionModule } from './pdf-extraction/pdf-extraction.module';
import { ConfigifyModule } from '@itgorillaz/configify';
import { MongooseModule } from '@nestjs/mongoose';
import { quizConfiguration } from './config/quiz.config';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    PdfExtractionModule,
    MongooseModule.forRootAsync({
      useFactory: async (dbConfig: quizConfiguration) => ({
        uri: dbConfig.GCE,
      }),
      inject: [quizConfiguration],
    }),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
