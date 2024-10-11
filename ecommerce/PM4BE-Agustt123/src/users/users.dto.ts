import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Matches, MinLength, MaxLength, Validate, IsEmpty } from 'class-validator';
import { MatchPassword } from 'src/decorations/matchPassword.decoration';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', minLength: 3, maxLength: 80 })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario. Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
    minLength: 8,
    maxLength: 128,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,128}$'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'Password too weak',
  })
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @ApiProperty({ description: 'Confirmación de la contraseña del usuario' })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({ description: 'Dirección del usuario', minLength: 3, maxLength: 80 })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({ description: 'País del usuario', minLength: 4, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  @ApiProperty({ description: 'Ciudad del usuario', minLength: 5, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiProperty({ description: 'Teléfono del usuario', minLength: 5, maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Indica si el usuario es administrador', required: false })
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}