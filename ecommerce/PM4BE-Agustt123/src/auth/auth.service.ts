import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entittes/users.entity';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from  "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private readonly userRepository:UserRepository,
    private readonly jwtService:JwtService,

     ){}
    getAuth(){
        return "autenticacion ";
    }

    async signIn (email:string ,password:string ){
        if (!email || !password)return "Email y contraseña requerida ";

        const user= await this.userRepository.getUserByEmail(email);
        if (!user) throw new BadRequestException("Credenciales incorrectas");
        //validar passwword
        const validPassword= await bcrypt.compare(password, user.password)
        if(!validPassword)throw new BadRequestException("Credenciales incorrectas");
        //firmamops el token

        const payload={id: user.id,email: user.email, isAdmin: user.isAdmin};
        const token= this.jwtService.sign(payload);

        return {
          message:"Usuario logueado...",
          token,
        }

     
        

    }
    async signUp(user: Partial<Users>) {
        const { email, password } = user;
      
        // Espera el resultado de getUserByEmail
        const foundUser = await this.userRepository.getUserByEmail(email);
        if (foundUser) {
          throw new BadRequestException('El mail ya se encuentra registrado');
        }
      
        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
      
        // Crea el nuevo usuario con la contraseña hasheada
        return await this.userRepository.addUser({
          ...user,
          password: hashedPassword,
        });
      } 
      
}
