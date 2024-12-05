import { Module } from '@nestjs/common';
import { PdfExtractionService } from './pdf-extraction.service';
import { PdfExtractionController } from './pdf-extraction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Paper, PaperSchema } from '../schemas/Paper.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Paper.name, schema: PaperSchema }]),
  ],
  controllers: [PdfExtractionController],
  providers: [PdfExtractionService],
})
export class PdfExtractionModule {}
