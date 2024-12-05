import { Injectable } from '@nestjs/common';

import { UpdatePdfExtractionDto } from './dto/update-pdf-extraction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Paper } from '../schemas/Paper.schema';
import { Model } from 'mongoose';

@Injectable()
export class PdfExtractionService {
  constructor(@InjectModel(Paper.name) private paperModel: Model<Paper>) {}

  async findAll(): Promise<Paper[]> {
    return this.paperModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} pdfExtraction`;
  }

  update(id: number, updatePdfExtractionDto: UpdatePdfExtractionDto) {
    return `This action updates a #${id} pdfExtraction`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdfExtraction`;
  }
}
