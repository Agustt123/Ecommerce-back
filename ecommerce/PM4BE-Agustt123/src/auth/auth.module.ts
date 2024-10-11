import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/users.repository'; // Asegúrate de importar UserRepository correctamente
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entittes/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [AuthController],
    providers: [AuthService, UserRepository] // Incluye UserRepository en los proveedores
})
export class AuthModule {}
