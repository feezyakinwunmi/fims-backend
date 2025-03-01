// src/crops/crops.controller.ts
import { Controller, Get, Post, Body, Query, Req, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { SuppliesService } from './supplies.service';
import { CreateSuppliesDto } from './supplies.service';
@Controller('supplies')
export class SuppliesController {
    constructor(private readonly suppliesService: SuppliesService) {}
  
    @Post()
    async create(@Body() createSuppliesDto: CreateSuppliesDto) {
      // Validate userId format
      if (!Types.ObjectId.isValid(createSuppliesDto.userId)) {
        throw new BadRequestException('Invalid user ID format');
      }
    
      // Create the crop
      const supplies = await this.suppliesService.create(createSuppliesDto, createSuppliesDto.userId);
    
      return {
        message: 'Supplies  created successfully',
        data: supplies
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
    
    const supplies = await this.suppliesService.findAllByUserAndCategory(userId);
  
    // Check if Supplies were found
    if (supplies.length === 0) {
      throw new NotFoundException('No Supplies found for this user');
    }
  
    return supplies;
  }}
  