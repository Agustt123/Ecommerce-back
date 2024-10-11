import { IsNotEmpty, IsUUID, ArrayMinSize, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Product } from 'src/entittes/product.entity';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID del usuario que realiza el pedido', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos en el pedido',
    type: [Product],
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Partial<Product[]>;
}
