import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: "ORDERDETAILS",
})
export class OrderDetail {
  @ApiProperty({ description: 'ID del detalle de la orden', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Precio total del detalle de la orden', type: 'number', format: 'decimal' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ type: () => Order, description: 'Orden asociada' })
  @OneToOne(() => Order, order => order.orderDetail)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ApiProperty({ type: () => [Product], description: 'Productos incluidos en el detalle de la orden' })
  @ManyToMany(() => Product, product => product.orderDetails)
  @JoinTable({
    name: "ORDERDETAILS:PRODUCTS",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "orderdetail_id",
      referencedColumnName: "id",
    }
  })
  products: Product[];
}
