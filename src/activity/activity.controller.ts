// src/Activitys/Activitys.controller.ts
import { Controller, Get, Post, Body, Query, Req, Param, Delete, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './activity.service';
import { ActivityService } from './activity.service';
import { User } from '../auth/schemas/user.schema';
import { Types } from 'mongoose';


@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

   @Post()
   async create(@Body() createActivityDto: CreateActivityDto) {
     // Validate userId format
     if (!Types.ObjectId.isValid(createActivityDto.userId)) {
       throw new BadRequestException('Invalid user ID format');
     }
   
     // Create the Activity
     const activity = await this.activityService.create(createActivityDto, createActivityDto.userId);
   
     return {
       message: 'Activity created successfully',
       data: activity
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
   
   const activity = await this.activityService.findAllByUserAndCategory(userId);
 
   // Check if Activitys were found
   if (activity.length === 0) {
     throw new NotFoundException('No Activitys found for this user');
   }
 
   return activity;
 }
 
 @Delete(':id')
async deleteActivity(
  @Param('id') id: string,
  @Body('userId') userId: string,
) {
  return this.activityService.delete(id, userId);
}
}
