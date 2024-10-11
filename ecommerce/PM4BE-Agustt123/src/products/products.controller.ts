import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/decorations/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("products")
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    async getProducts() {
        return await this.productsService.getProducts();
    }

    @Get("sedder")
    addProducts(){
        return this.productsService.addProduct();
    }

}