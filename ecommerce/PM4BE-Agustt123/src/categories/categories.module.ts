import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entittes/categories.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoriesRepository]
})
export class CategoriesModule {}
