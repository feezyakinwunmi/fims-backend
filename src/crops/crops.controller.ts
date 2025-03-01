// src/crops/crops.controller.ts
import { Controller, Get, Post, Body, Query, Req, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Request } from 'express';
import { CreateCropDto } from './crops.service';
import { CropsService } from './crops.service';
import { User } from '../auth/schemas/user.schema';


@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  async create(@Body() createCropDto: CreateCropDto) {
    // Validate userId format
    if (!Types.ObjectId.isValid(createCropDto.userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
  
    // Create the crop
    const crop = await this.cropsService.create(createCropDto, createCropDto.userId);
  
    return {
      message: 'Crop created successfully',
      data: crop
    };
  }
 
  // items.controller.ts
@Get()
async getItemsByCategory(
  @Query('userId') userId: string
) {
  if (!userId) {
    throw new BadRequestException('User ID is required');
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException('Invalid user ID format');
  }

 console.log(userId)
  
  const crops = await this.cropsService.findAllByUserAndCategory(userId);

  // Check if crops were found
  if (crops.length === 0) {
    throw new NotFoundException('No crops found for this user');
  }

  return crops;
}}
