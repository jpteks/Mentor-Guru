import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class userConfiguration {
  @Value('DB_URL')
  userDB: string;

  @Value('PORT')
  port: string;

  @Value('JWT_SECRET')
  jwtSecret: string;

  @Value('EXPIRES')
  jwtExp: string;

  @Value('EMAIL_PASS')
  emailPass: string;

  @Value('EMAIL_USER')
  emailUser: string;
}
