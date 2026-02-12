import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {

    const user = await this.userservice.findOneByEmail(registerDto.email)

    if(!user) { 

      registerDto.password = await bcryptjs.hash(registerDto.password, 10)

      const created = await this.userservice.create(registerDto as any);
      delete (created as any).password;
      return created;
    } else { throw new  BadRequestException("User already exists") }

     
  }

  async login(LoginDto: LoginDto) {
    const user = await this.userservice.findOneByEmail(LoginDto.email, { withPassword: true });

    if(!user) { throw new  UnauthorizedException("Invalid Credentials"); } 

    const isPasswordValid = await bcryptjs.compare(LoginDto.password, user.password);

    if(!isPasswordValid){ throw new  UnauthorizedException("Invalid Credentials"); } 
    
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      rol: user.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol,
      },
    };

  }
}
