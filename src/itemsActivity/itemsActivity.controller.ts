// src/ItemsActivity/itemsActivity.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Body, 
  Query, 
  Param,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { ItemsActivityService } from './itemsActivity.service';
import { CreateItemsActivityDto } from './dto/create-itemsActivity.dto';
import { UpdateActivityDto } from './dto/update-itemsActivity.dto';

@Controller('itemsactivity') // Changed to kebab-case convention
export class ItemsActivityController {
  constructor(
    private readonly itemsActivityService: ItemsActivityService // Consistent naming
  ) {}

  @Post()
  async create(
    @Body() createItemsActivityDto: CreateItemsActivityDto
  ) {
    try {
      return await this.itemsActivityService.create(createItemsActivityDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findByItem(
    @Query('itemId') itemId: string,
    @Query('category') category: string,
    // @Query('userId') userId: string // Added missing userId parameter
  ) {
    if (!itemId || !category
      //  || !userId
      ) {
      throw new BadRequestException('Missing required query parameters');
    }
    
    try {
      return await this.itemsActivityService.findByItem(
        itemId,
        category.toLowerCase(), // Ensure consistent casing
        // userId
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/return')
  async updateReturnStatus(
    @Param('id') _id: string,
    @Body('returned') returned: boolean
  ) {
    if (typeof returned !== 'boolean') {
      throw new BadRequestException('Returned status must be a boolean');
    }

    try {
      return await this.itemsActivityService.updateReturnStatus(_id, returned);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateActivity(
    @Param('id') activityId: string,
    @Body() updateData: UpdateActivityDto,
    // @Query('userId') userId: string
  ) {
    try {
      // if (!userId) {
      //   throw new BadRequestException('User ID is required');
      // }

      const updatedActivity = await this.itemsActivityService.updateActivity(
        activityId,
        updateData,
        
      );

      return {
        message: 'Activity updated successfully',
        data: updatedActivity
      };
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}