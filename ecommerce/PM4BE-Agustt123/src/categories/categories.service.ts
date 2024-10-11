import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private categotiesRepository:CategoriesRepository){}
    
    addCategories(){
        return this.categotiesRepository.addCategories();
    }
    getCategories(){
        return this.categotiesRepository.getCategories();
    }
}
