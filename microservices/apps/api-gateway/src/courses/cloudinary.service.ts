import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadConfiguration } from './config/upload.configuration';

@Injectable()
export class CloudinaryService {
  constructor(private readonly uploadConfig: UploadConfiguration) {
    cloudinary.config({
      cloud_name: uploadConfig.cloudName,
      api_key: uploadConfig.apiKey,
      api_secret: uploadConfig.apiSecret,
    });
  }

  // Upload an image from memory buffer with a custom filename
  async uploadImage(
    fileBuffer: Buffer,
    customName: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'thumbnails',
            resource_type: 'image',
            public_id: customName,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              return reject(
                new InternalServerErrorException(
                  'Cloudinary Upload Error: ' + error.message,
                ),
              );
            }
            resolve(result);
          },
        )
        .end(fileBuffer); // Upload using the file buffer
    });
  }

  // Delete an image from Cloudinary using the public ID
  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(
            new InternalServerErrorException(
              'Cloudinary Deletion Error: ' + error.message,
            ),
          );
        }
        resolve(result);
      });
    });
  }
}
