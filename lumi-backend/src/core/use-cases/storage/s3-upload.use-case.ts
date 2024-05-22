import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk"

@Injectable()
export class S3UploadUseCase {
    private s3: AWS.S3

    constructor() {
        this.s3 = new AWS.S3()
    }

    async execute(fileBuffer: Buffer, fileName: string): Promise<string> {
        const params = {
            Bucket: 'lumibucketteste',
            Key: fileName,
            Body: fileBuffer,
        }

        const { Location } = await this.s3.upload(params).promise();
        return Location;
    }
}