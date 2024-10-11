import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { OrderDetail } from './orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty({ description: 'ID de la orden', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Fecha de la orden', type: 'string', format: 'date-time' })
  @Column('timestamp')
  date: Date;

  @ApiProperty({ type: () => OrderDetail, description: 'Detalle de la orden' })
  @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetail: OrderDetail;

  @ApiProperty({ type: () => Users, description: 'Usuario que realizó la orden' })
  @ManyToOne(() => Users, user => user.orders)
  @JoinColumn({ name: "user_id" })
  user: Users;
}
