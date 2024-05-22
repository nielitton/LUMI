import { Module, Provider } from "@nestjs/common";
import { RepositoriesModule } from "../repositories/repositories.module";
import { ExtractPdfInfosUseCase } from "./pdf-extractor/extract-pdf.use-case";
import { FindManyInvoicesUseCase } from "./pdf-extractor/find-many-invoices.use-case";
import { S3UploadUseCase } from "./storage/s3-upload.use-case";

const extractorPdf: Provider[] = [
    ExtractPdfInfosUseCase,
    FindManyInvoicesUseCase
]

const storage: Provider[] = [
    S3UploadUseCase
]

const providers: Provider[] = [
    ...extractorPdf,
    ...storage
]

@Module({
    imports: [RepositoriesModule],
    exports: providers,
    providers,
})

export class UseCasesModule {}