// src/itemsActivity/dto/create-activity.dto.ts
import { IsEnum, IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

export enum ItemsActivityType {
  ISSUE = 'issue',
  SELL = 'sell',
  RESTOCK = 'stockup',
}

export enum ItemCategory {
  CROPS = 'crops',
  LIVESTOCK = 'livestock',
  TOOLS = 'tools',
  SUPPLIES = 'supplies',
}

export class CreateItemsActivityDto {
  @IsEnum(ItemCategory)
  category: string;

  @IsString()
  itemId: string;

  @IsEnum(ItemsActivityType)
  type: ItemsActivityType;

 @IsString()
  name: string;

  @IsNumber()
  quantity: number;

 

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  recipient: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  returned?: boolean;

  @IsString()
  editedBy: string;

 date?: Date;
  
    @IsString()
    @IsOptional()
    createdAt?: string; // Optional field for createdAt
  
    @IsString()
    @IsOptional()
    updatedAt?: string; // Optional field for updatedAt

    @IsOptional()
    @IsString()
    unit?: string;
  
    }