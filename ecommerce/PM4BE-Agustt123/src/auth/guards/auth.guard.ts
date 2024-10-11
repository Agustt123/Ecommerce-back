import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users/roles.enum';
import { ExtendedRequest } from '../../interface/extended-request.interface'; // Ajusta la ruta según tu estructura de archivos

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Obtener el contexto de ejecución
    const request = context.switchToHttp().getRequest<ExtendedRequest>();

    // Extraer token desde el header
    // AUTHORIZATION BEARER: TOKEN
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No se ha enviado un token');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      if (!user) throw new UnauthorizedException('Error al validar token');

      // Adjuntar fecha de expiración
      user.exp = new Date(user.exp * 1000);
      user.roles = user.isAdmin ? [Role.Admin] : [Role.User];

      // Adjuntar el usuario al request
      request.user = user;

    } catch (error) {
      throw new UnauthorizedException('Error al validar token');
    }
    return true;
  }
}
