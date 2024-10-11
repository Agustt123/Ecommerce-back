import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    getProducts() {
        return this.productsRepository.getProducts();
    }

    getProduct(id: string) {
        return this.productsRepository.getProduct(id);
    }

    addProduct() {
        return this.productsRepository.addProduct();
    }

    updateProduct(id: string, product: any) {
        return this.productsRepository.updateProduct(id, product);
    }

   // deleteProduct(id: string) {
     //   return this.productsRepository.deleteProduct(id);
    //}
}
