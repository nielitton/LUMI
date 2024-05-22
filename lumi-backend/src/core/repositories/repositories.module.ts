import { Module, Provider } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { PdfExtractorRepository } from "./pdf-extractor/pdf-extractor.repository";
import { PrismaPdfExtractorRepository } from "./pdf-extractor/prisma-pdf-extractor.repository";

const providers: Provider[] = [
    {
        provide: PdfExtractorRepository,
        useClass: PrismaPdfExtractorRepository,
    },
]

@Module({
    imports: [DatabaseModule],
    exports: providers,
    providers: providers,
})

export class RepositoriesModule {}