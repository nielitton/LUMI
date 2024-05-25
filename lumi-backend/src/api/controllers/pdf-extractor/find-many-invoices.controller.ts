import { Controller, Get, Param, Query } from "@nestjs/common";
import { PdfExtractorService } from "../../services/pdf-extractor/pdf-extractor.service";
import { FilterInvoicesDto } from "../../../core/models/dto/filter-invoices.dto";

@Controller('invoices')
export class FindManyInvoicesController {
    constructor(private readonly service: PdfExtractorService) { }

    @Get()
    public findManyInvoices(@Query() query: FilterInvoicesDto) {
        return this.service.findMany(query)
    }
}