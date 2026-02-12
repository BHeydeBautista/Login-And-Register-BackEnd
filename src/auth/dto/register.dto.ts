import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @Transform(({ value }) => value?.trim()?.toLowerCase())
    @IsEmail()
    email: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}
