import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UsersService) {}

  async register(registerDto: RegisterDto) {

    const user = await this.userservice.findOneByEmail(registerDto.email)

    if(!user) { 

      registerDto.password = await bcryptjs.hash(registerDto.password, 10)

      return await this.userservice.create(registerDto) 
    } else { throw new  BadRequestException("User already exists") }

     
  }

  login() {
    return 'login';
  }
}
