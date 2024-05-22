import { Injectable } from "@nestjs/common";
import { Where } from "src/core/models/dto/db-query-filter.dto";
import { FilterInvoicesDto } from "src/core/models/dto/filter-invoices.dto";
import { PdfExtractedEntity } from "src/core/models/entities/pdf-extracted.entity";
import { PdfExtractorRepository } from "src/core/repositories/pdf-extractor/pdf-extractor.repository";

@Injectable()
export class FindManyInvoicesUseCase {
    constructor(private readonly repository: PdfExtractorRepository) {}

    async execute({ clientNumber }: FilterInvoicesDto) {
        const where: Where<PdfExtractedEntity> = {
            AND: [
                { clientNumber }
            ]
        }

        return await this.repository.findMany({where})
    }
}