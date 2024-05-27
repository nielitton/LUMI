import { Test, TestingModule } from '@nestjs/testing';
import { PdfExtractorService } from "../services/pdf-extractor/pdf-extractor.service"
import { FilterInvoicesDto } from '../../core/models/dto/filter-invoices.dto';
import { FindManyInvoicesController } from '../controllers/pdf-extractor/find-many-invoices.controller';
import { PdfExtractorController } from './pdf-extractor/pdf-extractor.controller';
import { GetPdfController } from './storage/storage.controller';
import { S3Service } from '../services/s3-storage/s3.service';

describe('FindManyInvoicesController', () => {
    let findManyController: FindManyInvoicesController
    let extractPdfController: PdfExtractorController
    let s3Service: S3Service
    let storageController: GetPdfController
    let service: PdfExtractorService

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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GetPdfController],
            providers: [
                {
                    provide: S3Service,
                    useValue: {
                        getFileUrl: jest.fn().mockResolvedValue(Buffer.from('PDF_CONTENT')),
                    },
                },
            ],
        }).compile();

        storageController = module.get<GetPdfController>(GetPdfController);
        s3Service = module.get<S3Service>(S3Service);
    });

    it('should be defined', () => {
        expect(storageController).toBeDefined();
    });

    describe('downloadPdf', () => {
        it('should download the PDF file', async () => {
            const fileName = 'example.pdf';
            const res = {
                setHeader: jest.fn(),
                send: jest.fn(),
            };

            await storageController.downloadPdf(fileName, res);

            expect(s3Service.getFileUrl).toHaveBeenCalledWith(fileName);
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
            expect(res.setHeader).toHaveBeenCalledWith('Content-Disposition', `attachment; filename="${fileName}"`);
            expect(res.send).toHaveBeenCalledWith(Buffer.from('PDF_CONTENT'));
        });
    });
});
