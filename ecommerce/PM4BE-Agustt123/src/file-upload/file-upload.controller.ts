import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService:FileUploadService ){}

    @Post("uploadImage/:id")
@UseInterceptors(FileInterceptor("file"))

    uploadImage(@Param("id") producId:string, 
@UploadedFile(
    new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({
                maxSize:200000,
                message:"Supera el maximo permitido"
            }),
            new FileTypeValidator({
                fileType: /(.jpg|.png|.jpeg|.webp)/,
            })
        ]
    })
)file: Express.Multer.File,){

return this.fileUploadService.uploadImage(file,producId)
    }
}
