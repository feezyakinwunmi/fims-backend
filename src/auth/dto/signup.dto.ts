// src/auth/dto/signup.dto.ts
import { IsEmail, IsNotEmpty,Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  farmName: string;
  @IsNotEmpty()
  phone: number;
  
  @IsNotEmpty()
  @Length(6, 128)
  password: string;
}