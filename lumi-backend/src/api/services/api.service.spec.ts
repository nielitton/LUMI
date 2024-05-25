import { Test, TestingModule } from '@nestjs/testing';
import { PdfExtractorService } from './pdf-extractor/pdf-extractor.service';
import { ExtractPdfInfosUseCase } from '../../core/use-cases/pdf-extractor/extract-pdf.use-case';
import { FindManyInvoicesUseCase } from '../../core/use-cases/pdf-extractor/find-many-invoices.use-case';

describe('PdfExtractorService', () => {
    let service: PdfExtractorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PdfExtractorService,
                {
                    provide: ExtractPdfInfosUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindManyInvoicesUseCase,
                    useValue: { execute: jest.fn() },
                },
            ],
        }).compile();

        service = module.get<PdfExtractorService>(PdfExtractorService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

});
