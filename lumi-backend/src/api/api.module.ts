import { Module } from "@nestjs/common";
import { UseCasesModule } from "src/core/use-cases/use-cases.module";
import { PdfExtractorController } from "./controllers/pdf-extractor/pdf-extractor.controller";
import { PdfExtractorService } from "./services/pdf-extractor/pdf-extractor.service";
import { MulterModule } from "@nestjs/platform-express";
import { FindManyInvoicesController } from "./controllers/pdf-extractor/find-many-invoices.controller";
import { S3Service } from "./services/s3-storage/s3.service";
import { GetPdfController } from "./controllers/storage/storage.controller";

@Module({
    imports: [
        UseCasesModule, 
        MulterModule.register({
        dest: './uploads'
      }),
    ],
    controllers: [PdfExtractorController, FindManyInvoicesController, GetPdfController],
    providers: [PdfExtractorService, S3Service]
})
export class ApiModule {}