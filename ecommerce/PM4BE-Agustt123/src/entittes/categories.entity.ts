import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({ description: 'ID de la categoría', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre de la categoría', maxLength: 50 })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({ type: () => [Product], description: 'Productos pertenecientes a la categoría' })
  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
