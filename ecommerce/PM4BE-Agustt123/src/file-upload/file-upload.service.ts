import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entittes/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product) private readonly producRepository:Repository<Product>,
    ){}

    async uploadImage(file: Express.Multer.File,productId: string){
        //verificar si existe el prduct

        const product= await this.producRepository.findOneBy({id:productId});
        if(!product){
            throw new NotFoundException("Producto no encontrado ")
        }
          //perooo si existe
              


        const response = await this.fileUploadRepository.uploadImage(file);

        //actualizamos imagen 
        //haceme un trhow new daleee chatgpt
        await this.producRepository.update(productId,{
            imgUrl: response.secure_url,
        });

        const updatedProduct= await this.producRepository.findOneBy({id:productId});
        return  updatedProduct;

    }
}
