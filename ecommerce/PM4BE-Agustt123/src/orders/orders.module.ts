import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entittes/order.entity';
import { OrderDetail } from 'src/entittes/orderDetail.entity';
import { Users } from 'src/entittes/users.entity';
import { Product } from 'src/entittes/product.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Users, Product]),
    // Otros módulos que puedas necesitar
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrdersService], // Asegúrate de exportar OrdersService si lo necesitas fuera de este módulo
})
export class OrdersModule {}
