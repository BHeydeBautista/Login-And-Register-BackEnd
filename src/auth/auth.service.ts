import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UsersService) {}

  async register(registerDto: RegisterDto) {

    const user = await this.userservice.findOneByEmail(registerDto.email)

    if(!user) { return await this.userservice.create(registerDto) }
    else { throw new  BadRequestException("User already exists") }

     
  }

  login() {
    return 'login';
  }
}
