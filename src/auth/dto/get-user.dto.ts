// src/auth/dto/get-user.dto.ts
import { Expose } from 'class-transformer';

export class GetUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  farmName: string;

  @Expose()
  phone: string;


}