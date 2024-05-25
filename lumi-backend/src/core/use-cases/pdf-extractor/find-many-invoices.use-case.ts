import { Injectable } from "@nestjs/common";
import { Where } from "../../models/dto/db-query-filter.dto";
import { FilterInvoicesDto } from "../../models/dto/filter-invoices.dto";
import { PdfExtractedEntity } from "../../models/entities/pdf-extracted.entity";
import { PdfExtractorRepository } from "../../repositories/pdf-extractor/pdf-extractor.repository";

@Injectable()
export class FindManyInvoicesUseCase {
    constructor(private readonly repository: PdfExtractorRepository) { }

    async execute({ clientNumber }: FilterInvoicesDto) {
        const where: Where<PdfExtractedEntity> = {
            AND: [
                { clientNumber }
            ]
        }

        const count = await this.repository.count({ where })

        const invoices = await this.repository.findMany({ where })

        return { invoices, count }
    }
}