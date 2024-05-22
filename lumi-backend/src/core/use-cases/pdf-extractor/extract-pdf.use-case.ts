import { Injectable } from "@nestjs/common";
import { BusinessException } from "src/core/exception/businnes-exception";
import { PdfExtractedEntity } from "src/core/models/entities/pdf-extracted.entity";
import { PdfExtractorRepository } from "src/core/repositories/pdf-extractor/pdf-extractor.repository";
import PDFExtract from 'pdf-parse';
import * as AWS from "aws-sdk"
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from "src/core/environments/envitoment";

@Injectable()
export class ExtractPdfInfosUseCase {
    private s3: AWS.S3

    constructor(private readonly repository: PdfExtractorRepository) {
        this.s3 = new AWS.S3({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region: AWS_REGION
        })
    }

    async execute(buffer: Buffer): Promise<PdfExtractedEntity> {
        const pdfExtract = await PDFExtract(buffer, {});
        
        const invoice = pdfExtract.text
        const lines = invoice.split('\n');

        // Buscando número da nota físcal
        const invoiceNumberIndex = lines.findIndex(line => line.includes('NOTA FISCAL'));
        const invoiceNumberLine = lines[invoiceNumberIndex]
        const invoiceNumber = invoiceNumberLine.split(' ').filter(item => item.trim() !== "")[3];

        // Buscando valor total
        const totalValueIndex = lines.findIndex(line => line.includes('Referente a'));
        const totalValueLine = lines[totalValueIndex + 1]
        const totalValue = totalValueLine.split(' ').filter(item => item.trim() !== "")[2];
    
        // buscando referência
        const referenciaIndex = lines.findIndex(line => line.includes('Referente a'));
        const referenceValues = lines[referenciaIndex + 1]
        const referenceMonth = referenceValues.split(' ').filter(item => item.trim() !== "")[0];
    
        // Buscando número do cliente
        const clientNumberIndex = lines.findIndex(line => line.includes('DO CLIENTE'))
        const clientNumberValues = lines[clientNumberIndex + 1]
        const clientNumber = clientNumberValues.split(' ').filter(item => item.trim() !== "")[0]

        // Buscando energia elétrica
        const electricEnergyIndex = lines.findIndex(line => line.includes('Energia Elétrica'))
        const electricEnergyValues = lines[electricEnergyIndex]
        const electricEnergyParts = electricEnergyValues.split(' ').filter(item => item.trim() !== "")

        const electricEnergyQuantity = electricEnergyParts[2]
        const electricEnergyValue = electricEnergyParts[4]

        const electricEnergy = { electricEnergyQuantity, electricEnergyValue }

        // Buscando energia sceee
        const energySceeeValues = lines[electricEnergyIndex + 1]
        const energySceee = energySceeeValues.split(' ').filter(item => item.trim() === '' || /^\d+$/.test(item.trim().replace(/,/g, ''))).filter(item => item.trim() !== '');

        const energySceeQuantity = energySceee[0]
        const energySceeValue = energySceee[2]

        const sceeEnergy = { energySceeQuantity, energySceeValue }

        // Buscando energia compensada
        const compensedEnergyLine = lines[electricEnergyIndex + 2]
        const compensedEnergyValues = compensedEnergyLine.split(' ').filter(item => item.trim() !== "")

        const compensedEnergyValuesQuantity = compensedEnergyValues[4]
        const compensedEnergyValuesValue = compensedEnergyValues[6]

        const compensedEnergy = { compensedEnergyValuesQuantity, compensedEnergyValuesValue }

        // Buscando contribuição de iluminação pública
        const publicEnergyLine = lines[electricEnergyIndex + 3]
        const publicEnergyValues = publicEnergyLine.split(' ').filter(item => item.trim() !== "")[4]

        const publicEnergyValue = publicEnergyValues

        const invoiceExist = await this.repository.findByNumber(invoiceNumber)

        if(invoiceExist) {
            throw new BusinessException("Fatura já importada", 400)
        }
        
        const params = {
            Bucket: S3_BUCKET_NAME,
            Key: invoiceNumber,
            Body: buffer,
        }
        
        await this.s3.upload(params).promise();
        const data: PdfExtractedEntity =  {
            clientNumber,
            totalValue,
            invoiceNumber,
            referenceMonth,
            eletricEnergyKwh: electricEnergy.electricEnergyQuantity,
            eletricEnergyValue: electricEnergy.electricEnergyValue,
            compensedEnergyKwh: compensedEnergy.compensedEnergyValuesQuantity,
            compensedEnergyValue: compensedEnergy.compensedEnergyValuesValue,
            sceeEnergyKwh: sceeEnergy.energySceeQuantity,
            sceeEnergyValue: sceeEnergy.energySceeValue,
            publicContrib: publicEnergyValue
        };

        return await this.repository.create(data)
    }
}