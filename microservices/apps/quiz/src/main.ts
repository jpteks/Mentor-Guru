import { NestFactory } from '@nestjs/core';
import { QuizModule } from './quiz.module';
import { quizConfiguration } from './config/quiz.config';

async function bootstrap() {
  const app = await NestFactory.create(QuizModule);
  const config = app.get(quizConfiguration);
  const port = config.port || 3003;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
