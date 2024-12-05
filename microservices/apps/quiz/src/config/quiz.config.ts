import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class quizConfiguration {
  @Value('DB_URL')
  GCE: string;

  @Value('PORT_QUIZ')
  port: string;
}
