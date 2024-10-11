import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entittes/product.entity';
import { Category } from 'src/entittes/categories.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Category])],
  controllers: [ProductsController],
  providers: [ProductsService,ProductsRepository]
})
export class ProductsModule {}
