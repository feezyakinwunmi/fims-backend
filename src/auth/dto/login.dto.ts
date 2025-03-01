// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 128)
  password: string;
}