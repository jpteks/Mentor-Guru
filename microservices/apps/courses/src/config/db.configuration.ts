import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class dbConfiguration {
  @Value('DB_METADATA_URL')
  coursesDB: string;
}
