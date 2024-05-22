import { IsNotEmpty, IsOptional } from "class-validator";

export class FilterInvoicesDto {
    @IsOptional()
    clientNumber: string;
}