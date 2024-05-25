import { Test, TestingModule } from '@nestjs/testing';
import { PdfExtractorService } from "../services/pdf-extractor/pdf-extractor.service"
import { FilterInvoicesDto } from '../../core/models/dto/filter-invoices.dto';
import { FindManyInvoicesController } from '../controllers/pdf-extractor/find-many-invoices.controller';
import { PdfExtractorController } from './pdf-extractor/pdf-extractor.controller';
import { PdfExtractedEntity } from 'src/core/models/entities/pdf-extracted.entity';

describe('FindManyInvoicesController', () => {
    let findManyController: FindManyInvoicesController;
    let extractPdfController: PdfExtractorController
    let service: PdfExtractorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FindManyInvoicesController],
            providers: [
                {
                    provide: PdfExtractorService,
                    useValue: {
                        findMany: jest.fn(),
                    },
                },
            ],
        }).compile();

        findManyController = module.get(FindManyInvoicesController);
        service = module.get(PdfExtractorService);
    });

    it('should be defined', () => {
        expect(findManyController).toBeDefined();
    });

    describe('findManyInvoices', () => {
        it('should call service.findMany with the provided query', () => {
            const query: FilterInvoicesDto = { clientNumber: '' };

            findManyController.findManyInvoices(query);

            expect(service.findMany).toHaveBeenCalledWith(query);
        });

    });
});
