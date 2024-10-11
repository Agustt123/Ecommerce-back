import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesControllerController } from './-/categories/categories.controller/categories.controller.controller';

import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load: [typeOrmConfig],
    }),
    
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(confgiService:ConfigService)=> confgiService.get("typeorm"),

    }),
    ProductsModule, UsersModule,  AuthModule, CategoriesModule, OrdersModule, FileUploadModule,JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn :"60m"},
    })],
  controllers: [AppController, CategoriesControllerController, OrdersController],
  providers: [AppService, ],
})
export class AppModule {}
