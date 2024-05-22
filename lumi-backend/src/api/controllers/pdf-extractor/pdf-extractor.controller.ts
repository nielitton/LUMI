// pdf-extractor.controller.ts

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfExtractorService } from '../../services/pdf-extractor/pdf-extractor.service';
import * as fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

@Controller('pdf-extractor')
export class PdfExtractorController {
  constructor(private readonly pdfExtractorService: PdfExtractorService) {}

  @Post('extract')
  @UseInterceptors(FileInterceptor('pdf'))
  async extractData(@UploadedFile() file: Express.Multer.File): Promise<any> {
      const pdfBuffer = await readFileAsync(file.path);

      const extractedData = await this.pdfExtractorService.extractData(pdfBuffer);
      return extractedData;
  }
}
