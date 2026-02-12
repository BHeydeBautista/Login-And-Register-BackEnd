import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @Transform(({ value }) => value?.trim()?.toLowerCase())
    @IsEmail()
    email: string;

    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @Transform(({ value }) => value?.trim())
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;
}
