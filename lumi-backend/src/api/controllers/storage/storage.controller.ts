import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { S3Service } from '../../services/s3-storage/s3.service';

@Controller('pdf')
export class GetPdfController {
  constructor(private readonly s3Service: S3Service) { }

  @Get(':fileName')
  async downloadPdf(@Param('fileName') fileName: string, @Res() res: any): Promise<void> {
    const fileBuffer = await this.s3Service.getFileUrl(fileName);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.send(fileBuffer);
  }
}
