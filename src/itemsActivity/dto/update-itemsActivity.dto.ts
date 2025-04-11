import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum ActivityType {
  ISSUE = 'issue',
  SELL = 'sell',
  STOCKUP = 'stockup'
}

export class UpdateActivityDto {
  @IsOptional()
  @IsEnum(ActivityType)
  type?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  recipient?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  quantityUnit?: string;
 

  @IsOptional()
  date?: Date;
}