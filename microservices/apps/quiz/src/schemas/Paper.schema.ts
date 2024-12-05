import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Paper extends Document {
  @Prop({ required: true })
  name: string;

  password: string;

  @Prop({ required: true })
  Category: string;

  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  paper: string;

  @Prop({ required: true })
  year: string;
}

export const PaperSchema = SchemaFactory.createForClass(Paper);
