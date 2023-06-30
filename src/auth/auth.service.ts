import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseError, ResponseSuccess } from 'src/common/dto/response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  async signIn(data: LoginUserDto): Promise<any> {
    try {
      const user = await this.users.findOne(data.email);

      if (!user) {
        throw new UnauthorizedException({
          message: 'El correo electrónico no existe',
        });
      }
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch)
        throw new UnauthorizedException({ message: 'Contraseña incorrecta' });

      const payload = { sub: user.id, email: user.email };

      const { password, ...result } = user;

      return new ResponseSuccess('Ingresado correctamente', {
        access_token: await this.jwtService.signAsync(payload),
        user: result,
      });
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }

  async signUp(data: RegisterUserDto): Promise<any> {
    try {
      const userExists = await this.users.findOne(data.email);
      if (userExists) {
        return new UnauthorizedException({
          message: 'Ya existe un usuario con ese correo electrónico',
        });
      }
      const user = await this.users.createUser(data);

      const payload = { sub: user.id, email: user.email };
      
      return new ResponseSuccess('Registrado correctamente', {
        access_token: await this.jwtService.signAsync(payload),
      });
    } catch (error) {
      return new ResponseError(error.message, error);
    }
  }
}
