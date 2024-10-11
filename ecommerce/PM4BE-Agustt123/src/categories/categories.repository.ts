import { Injectable } from "@nestjs/common";
import * as data from "../utils/data.json";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entittes/categories.entity"; // Asegúrate de que la ruta sea correcta y coincida con tu estructura de archivos
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ) {}

    async getCategories() {
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        data?.map(async(element)=>{
            await this.categoriesRepository
            .createQueryBuilder()
            .insert()
            .into(Category)
            .values({name: element.category})
            .orIgnore()
            .execute()
        });
        return "Categoria agregada "

    }
    
}
