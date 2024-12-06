import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'apps/users/src/schemas/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class AddBioAndAvatarMigrationService {
  private readonly logger = new Logger(AddBioAndAvatarMigrationService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Run migration to add default values to existing users.
   */
  async runMigration() {
    try {
      this.logger.log('Starting migration to add bio and avatarUrl...');

      const result = await this.userModel.updateMany(
        {
          $or: [{ avatarUrl: { $exists: false } }, { bio: { $exists: false } }],
        },
        {
          $set: {
            avatarUrl:
              'https://utfs.io/a/f3s5czn47t/sDJN6CSX6MvYpdmKilBLdOaUJ8ehvYZ7r2Ff0HXCwlEB41gi', // Replace with actual URL
            bio: '', // Default empty bio
          },
        },
      );

      this.logger.log(
        `Migration completed. Updated ${result.modifiedCount} user(s).`,
      );
    } catch (error) {
      this.logger.error('Migration failed', error);
      throw error;
    }
  }
}
