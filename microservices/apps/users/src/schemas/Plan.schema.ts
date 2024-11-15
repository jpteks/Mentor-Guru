import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Plan extends Document {
  @Prop({ required: true, enum: ['Free', 'Basic', 'Premium'], default: 'Free' })
  packageName: string;
  @Prop({ default: true })
  accessToPastPapers: boolean;
  @Prop({ default: true })
  accessToPdfSolutions: boolean;
  @Prop({ default: true })
  accessToRestrictedVideos: boolean;
  @Prop({ default: false })
  accessToVideoSolutions: boolean;
  @Prop({ default: false })
  downloadablePapers: boolean;
  @Prop({ default: false })
  accessToAllCourses: boolean;
  @Prop({ default: false })
  downloadableAnswers: boolean;
  @Prop({ default: false })
  downloadableVideos: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
