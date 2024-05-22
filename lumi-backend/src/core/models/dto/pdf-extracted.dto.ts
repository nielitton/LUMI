import { IsNotEmpty } from "class-validator";
import { PdfExtractedEntity } from "../entities/pdf-extracted.entity";

export class PdfExtractedDto extends PdfExtractedEntity {
    
    @IsNotEmpty({ message: "invoiceNumber required" })
    invoiceNumber: string;

    @IsNotEmpty({ message: "clientNumber required" })
    clientNumber: string;

    @IsNotEmpty({ message: "totalValue required" })
    totalValue: string;

    @IsNotEmpty({ message: "referenceMonth required" })
    referenceMonth: string;

    @IsNotEmpty({ message: "compensedEnergyKwh required" })
    compensedEnergyKwh: string;

    @IsNotEmpty({ message: "compensedEnergyValue required" })
    compensedEnergyValue: string;

    @IsNotEmpty({ message: "eletricEnergyKwh required" })
    eletricEnergyKwh: string;

    @IsNotEmpty({ message: "eletricEnergyValue required" })
    eletricEnergyValue: string;

    @IsNotEmpty({ message: "publicContrib required" })
    publicContrib: string;

    @IsNotEmpty({ message: "sceeEnergyKwh required" })
    sceeEnergyKwh: string;

    @IsNotEmpty({ message: "sceeEnergyValue required" })
    sceeEnergyValue: string;

}