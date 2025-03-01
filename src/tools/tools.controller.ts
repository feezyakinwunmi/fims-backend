// src/tools/tools.controller.ts
import { Controller, Get, Post, Body, Query, Req, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolsDto } from './tools.service';
import { Types } from 'mongoose';


@Controller('tools')
export class ToolsController {
  constructor(private readonly ToolsService: ToolsService) {}

  @Post()
  async create(@Body() createToolsDto: CreateToolsDto) {
    // Validate userId format
    if (!Types.ObjectId.isValid(createToolsDto.userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
  
    // Create the crop
    const tool = await this.ToolsService.create(createToolsDto, createToolsDto.userId);
  
    return {
      message: 'Tools  created successfully',
      data: tool
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
  
  const tools = await this.ToolsService.findAllByUserAndCategory(userId);

  // Check if Tools were found
  if (tools.length === 0) {
    throw new NotFoundException('No Tools found for this user');
  }

  return tools;
}}
