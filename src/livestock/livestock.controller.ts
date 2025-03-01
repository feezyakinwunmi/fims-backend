// src/livestock/livestock.controller.ts
import { LivestockService } from './livestock.service';
import { CreateLivestockDto } from './livestock.service';
import { Controller, Get, Post, Body, Query, Req, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
@Controller('livestock')
export class LivestockController {
   constructor(private readonly livestockService: LivestockService) {}
 
   @Post()
   async create(@Body() createLivestockDto: CreateLivestockDto) {
     // Validate userId format
     if (!Types.ObjectId.isValid(createLivestockDto.userId)) {
       throw new BadRequestException('Invalid user ID format');
     }
   
     // Create the crop
     const livestock = await this.livestockService.create(createLivestockDto, createLivestockDto.userId);
   
     return {
       message: 'Livestock  created successfully',
       data: livestock
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
   
   const livestock = await this.livestockService.findAllByUserAndCategory(userId);
 
   // Check if Livestock were found
   if (livestock.length === 0) {
     throw new NotFoundException('No Livestock found for this user');
   }
 
   return livestock;
 }}
