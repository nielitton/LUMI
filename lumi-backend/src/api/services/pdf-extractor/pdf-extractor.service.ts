// pdf-extractor.service.ts

import { Injectable } from '@nestjs/common';
import { FilterInvoicesDto } from 'src/core/models/dto/filter-invoices.dto';
import { ExtractPdfInfosUseCase } from 'src/core/use-cases/pdf-extractor/extract-pdf.use-case';
import { FindManyInvoicesUseCase } from 'src/core/use-cases/pdf-extractor/find-many-invoices.use-case';

@Injectable()
export class PdfExtractorService {
  constructor(
    private readonly extractorUseCase: ExtractPdfInfosUseCase,
    private readonly findManyInvoicesUseCase: FindManyInvoicesUseCase
  ) {}

  async extractData(pdfBuffer: Buffer) {
    return this.extractorUseCase.execute(pdfBuffer)
  }

  async findMany({ clientNumber }: FilterInvoicesDto) {
    return await this.findManyInvoicesUseCase.execute({ clientNumber })
  }
}
