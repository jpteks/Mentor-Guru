import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { PdfExtractionService } from './pdf-extraction.service';

import { UpdatePdfExtractionDto } from './dto/update-pdf-extraction.dto';

@Controller('pdf-extraction')
export class PdfExtractionController {
  constructor(private readonly pdfExtractionService: PdfExtractionService) {}

  @Get()
  async findAll() {
    const papers = await this.pdfExtractionService.findAll();

    return papers;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfExtractionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePdfExtractionDto: UpdatePdfExtractionDto,
  ) {
    return this.pdfExtractionService.update(+id, updatePdfExtractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pdfExtractionService.remove(+id);
  }
}
