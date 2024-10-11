import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entittes/categories.entity";
import {Product} from "src/entittes/product.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json";






@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    async getProducts(): Promise<Product[]> {
        const products = await this.productsRepository.find({
            relations: ["category"], // Relación con la categoría
        });
        return products;
    }

    async getProduct(id: string) {
        
        const product = this.productsRepository.findOneBy({id});
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return product;
    }

    async addProduct() {
        const categories= await this.categoriesRepository.find();
         data?.map(async(element)=> {
            const category=categories.find(
                (category)=> category.name === element.category,
            );
            const product = new Product();
            product.name= element.name;
            product.description= element.description;
            product.price= element.price;
            product.imgUrl= element.imgUri;
            product.stock = element.stock;
            product.category= category;
            await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .orUpdate(
                ["description","price","imgUrl","stock"],
                ["name"]
            )
            .execute();
         });
         return "Productos agregados";
    }

    async updateProduct(id: string, product:Product) {
        await this.productsRepository.update(id,product);
        const updatedProduct= await this.productsRepository.findOneBy({id});
        return updatedProduct;
    }

   
}