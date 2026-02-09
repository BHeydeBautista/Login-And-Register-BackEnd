import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transform"

export class RegisterDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}
