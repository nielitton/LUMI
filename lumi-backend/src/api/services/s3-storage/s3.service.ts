import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk"
import { BusinessException } from "src/core/exception/businnes-exception";

@Injectable()
export class S3Service {
    private s3: AWS.S3

    constructor() {
        this.s3 = new AWS.S3()
    }

    async getFileUrl(fileName: string): Promise<Buffer> {
        const params = {
            Bucket: 'lumibucketteste',
            Key: fileName,
        }

        try {
            const { Body } = await this.s3.getObject(params).promise();
            return Body as Buffer;
        } catch(error) {
            if(error.statusCode === 404) {
                throw new BusinessException("Fatura não encontrada", 404)
            }
        }

    }
}