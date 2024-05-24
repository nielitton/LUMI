import { Injectable } from "@nestjs/common";
import { PdfExtractorRepository } from "./pdf-extractor.repository";
import { PrismaService } from "src/core/database/prisma/prisma.service";
import { PdfExtractedEntity } from "src/core/models/entities/pdf-extracted.entity";
import { PdfExtractedDto } from "src/core/models/dto/pdf-extracted.dto";
import { DbQueryFilter } from "src/core/models/dto/db-query-filter.dto";

@Injectable()
export class PrismaPdfExtractorRepository implements PdfExtractorRepository {
    constructor(private prisma: PrismaService) { }

    async create(pdfExtractedData: PdfExtractedDto): Promise<PdfExtractedEntity> {
        return this.prisma.invoice.create({
            data: pdfExtractedData
        })
    }

    async findMany(filter?: DbQueryFilter): Promise<PdfExtractedEntity[]> {
        return await this.prisma.invoice.findMany({
            where: filter?.where,
            skip: filter?.skip,
            take: filter?.take,
            orderBy: filter.orderBy,
        })
    }

    async count(filter?: DbQueryFilter): Promise<number> {
        return await this.prisma.invoice.count({
            where: filter?.where
        })
    }

    async findByNumber(invoiceNumber: string) {
        return await this.prisma.invoice.findFirst({
            where: {
                invoiceNumber
            }
        })
    }
}