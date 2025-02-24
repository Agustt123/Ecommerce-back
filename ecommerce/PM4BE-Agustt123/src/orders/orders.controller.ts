import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {} // Asegúrate de que OrdersService esté inyectado aquí

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get(":id")
  getOrder(@Param("id") id: string) {
    return this.ordersService.getOrder(id);
  }
}

