import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: "USER",
})
export class Users {
  @ApiProperty({ description: 'ID del usuario', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre del usuario', maxLength: 80 })
  @Column({ length: 80 })
  name: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', maxLength: 50 })
  @Column({ length: 50, unique: true })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', maxLength: 128 })
  @Column({ length: 128 })
  password: string;

  @ApiProperty({ description: 'Teléfono del usuario', maxLength: 20, nullable: true })
  @Column({ length: 20, nullable: true })
  phone: string;

  @ApiProperty({ description: 'País del usuario', maxLength: 20, nullable: true })
  @Column({ length: 20, nullable: true })
  country: string;

  @ApiProperty({ description: 'Dirección del usuario', maxLength: 80, nullable: true })
  @Column({ length: 80, nullable: true })
  address: string;

  @ApiProperty({ description: 'Ciudad del usuario', maxLength: 20, nullable: true })
  @Column({ length: 20, nullable: true })
  city: string;

  @ApiProperty({ description: 'Indica si el usuario es administrador', default: false })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty({ type: () => [Order], description: 'Órdenes del usuario' })
  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
