import { DbQueryFilter } from "src/core/models/dto/db-query-filter.dto";
import { PdfExtractedDto } from "src/core/models/dto/pdf-extracted.dto";
import { PdfExtractedEntity } from "src/core/models/entities/pdf-extracted.entity";

export abstract class PdfExtractorRepository {
    abstract create(pdfBuffer: PdfExtractedDto): Promise<PdfExtractedEntity>
    abstract findMany(filter?: DbQueryFilter): Promise<PdfExtractedEntity[]>
    abstract findByNumber(number: string): Promise<PdfExtractedEntity>
}