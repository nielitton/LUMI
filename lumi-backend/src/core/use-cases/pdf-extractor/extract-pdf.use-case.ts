import { Injectable } from "@nestjs/common";
import { BusinessException } from "../../exception/businnes-exception";
import { PdfExtractedEntity } from "src/core/models/entities/pdf-extracted.entity";
import { PdfExtractorRepository } from "../../repositories/pdf-extractor/pdf-extractor.repository";
import PDFExtract from 'pdf-parse';
import * as AWS from "aws-sdk"
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME } from "../../environments/enviroment";

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

        console.log(lines)

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
        const energySceeeIndex = lines.findIndex(line => line.includes('SCEE'))
        const energySceeeValues = lines[energySceeeIndex]
        const energySceee = energySceeeValues ? energySceeeValues.split(' ').filter(item => item.trim() !== "").filter(item => item !== 's/') : '0'

        const energySceeQuantity = Array(energySceee) ? energySceee[3] : '0'
        const energySceeValue = Array(energySceee) ? energySceee[5] : '0'

        const sceeEnergy = { energySceeQuantity, energySceeValue }

        // Buscando energia compensada
        const compensedEnergyIndex = lines.findIndex(line => line.includes('compensada'))
        const compensedEnergyLine = lines[compensedEnergyIndex]

        const compensedEnergyValues = compensedEnergyLine ? compensedEnergyLine.split(' ').filter(item => item.trim() !== "") : '0'

        const compensedEnergyValuesQuantity = Array(compensedEnergyValues) ? compensedEnergyValues[4] : '0'
        const compensedEnergyValuesValue = Array(compensedEnergyValues) ? compensedEnergyValues[6] : '0'

        const compensedEnergy = { compensedEnergyValuesQuantity, compensedEnergyValuesValue }

        // Buscando contribuição de iluminação pública
        const publicEnergyIndex = lines.findIndex(line => line.includes('Publica'))
        const publicEnergyLine = lines[publicEnergyIndex]
        console.log(publicEnergyLine)
        const publicEnergyValues = publicEnergyLine.split(' ').filter(item => item.trim() !== "")[4]

        const publicEnergyValue = publicEnergyValues

        const invoiceExist = await this.repository.findByNumber(invoiceNumber)

        if (invoiceExist) {
            throw new BusinessException("Fatura já importada", 400)
        }

        const params = {
            Bucket: S3_BUCKET_NAME,
            Key: invoiceNumber,
            Body: buffer,
        }

        await this.s3.upload(params).promise();
        const data: PdfExtractedEntity = {
            clientNumber,
            totalValue,
            invoiceNumber,
            referenceMonth,
            eletricEnergyKwh: electricEnergy.electricEnergyQuantity || '0',
            eletricEnergyValue: electricEnergy.electricEnergyValue || '0',
            compensedEnergyKwh: compensedEnergy.compensedEnergyValuesQuantity || '0',
            compensedEnergyValue: compensedEnergy.compensedEnergyValuesValue || '0',
            sceeEnergyKwh: sceeEnergy.energySceeQuantity || "0",
            sceeEnergyValue: sceeEnergy.energySceeValue || '0',
            publicContrib: publicEnergyValue || '0'
        };

        return await this.repository.create(data)
    }
}