import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, Unique, JoinColumn } from 'typeorm';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class Product {
  @ApiProperty({ description: 'ID del producto', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre del producto', maxLength: 50 })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({ description: 'Descripción del producto', type: 'text' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Precio del producto', type: 'number', format: 'decimal' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Stock del producto', type: 'number', format: 'int' })
  @Column('int')
  stock: number;

  @ApiProperty({ description: 'URL de la imagen del producto', type: 'text', default: 'default-image-url' })
  @Column('text', { default: 'default-image-url' })
  imgUrl: string;

  @ApiProperty({ type: () => Category, description: 'Categoría del producto' })
  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ApiProperty({ type: () => [OrderDetail], description: 'Detalles de orden asociados al producto' })
  @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}
