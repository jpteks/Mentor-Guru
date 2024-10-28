import { Configuration, Value } from '@itgorillaz/configify';

@Configuration()
export class UploadConfiguration {
  @Value('CLOUDINARY_CLOUD_NAME')
  cloudName: string;

  @Value('CLOUDINARY_API_KEY')
  apiKey: string;

  @Value('CLOUDINARY_API_SECRET')
  apiSecret: string;

  @Value('host')
  host: string;
}
