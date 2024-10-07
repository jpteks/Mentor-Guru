import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: false })
  authorId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnailUrl: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: false })
  isPublished: boolean;

  @Prop({ required: false })
  price: number;

  @Prop({ default: true })
  isUpdatedVersion: boolean;

  @Prop({ required: true })
  publicId: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
