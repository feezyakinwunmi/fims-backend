// src/ItemsActivity/ItemsActivity.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ItemsActivity, ItemsActivityDocument } from './schemas/itemsActivity.schema';
import { CreateItemsActivityDto } from './dto/create-itemsActivity.dto';
import { UpdateActivityDto } from './dto/update-itemsActivity.dto';

@Injectable()
export class ItemsActivityService {
  constructor(
    @InjectModel(ItemsActivity.name) private itemsActivityModel: Model<ItemsActivityDocument>,
    @InjectModel('Crop') private cropModel: Model<any>,
    @InjectModel('Tool') private toolModel: Model<any>,
    @InjectModel('Supplies') private suppliesModel: Model<any>,
    @InjectModel('Livestock') private livestockModel: Model<any>
  ) {}

  async create(createItemsActivityDto: CreateItemsActivityDto): Promise<ItemsActivityDocument> {
    // Validate item exists
    const itemModel = this.getItemModel(createItemsActivityDto.category);
    const item = await itemModel.findById(createItemsActivityDto.itemId).exec();
    
    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // Convert string IDs to ObjectId
    const itemId = new Types.ObjectId(createItemsActivityDto.itemId);
    // const userId = new Types.ObjectId(createItemsActivityDto.userId);
    const unit = createItemsActivityDto.unit || 'pcs';

    // Update item stock
    const stockChange = createItemsActivityDto.type === 'stockup' 
      ? createItemsActivityDto.quantity 
      : -createItemsActivityDto.quantity;

    await itemModel.findByIdAndUpdate(
      itemId,
      { $inc: { currentStock: stockChange } },
      { new: true }
    );

    // Create activity with proper typing
    const newActivity = new this.itemsActivityModel({
      ...createItemsActivityDto,
      itemId,
      unit,
      // userId,
      date: createItemsActivityDto.date || new Date()
    });

    return newActivity.save();
  }

  async findByItem(itemId: string, category: string,
    //  userId: string
    ) {
    console.log('Searching for:', {
      itemId,
      category,
      // userId,
      convertedItemId: new Types.ObjectId(itemId),
      // convertedUserId: new Types.ObjectId(userId)
    });
  
    const query = {
      itemId: new Types.ObjectId(itemId),
      category: category.toLowerCase(),
      // userId: new Types.ObjectId(userId)
    };
  
    console.log('Executing query:', query); // Debug log
const itemsActivity = await this.itemsActivityModel.find(query).select('+unit').exec();
    // if (!itemsActivity || itemsActivity.length === 0) {
    //   throw new NotFoundException('No activities found for this item');
    // }
    console.log(`Found ${itemsActivity.length} itemactivity `);

    return itemsActivity;
  }

  async updateReturnStatus(_id: string, returned: boolean): Promise<ItemsActivityDocument> {
    if (!Types.ObjectId.isValid(_id)) throw new BadRequestException('Invalid activity ID');

    const activity = await this.itemsActivityModel.findById(_id).exec();
    if (!activity) throw new NotFoundException('Activity not found');

    if (activity.type !== 'issue') {
      throw new BadRequestException('Only issued items can be returned');
    }

    // Skip if status isn't changing
    if (activity.returned !== returned) {
      const itemModel = this.getItemModel(activity.category);
      const stockChange = returned ? activity.quantity : -activity.quantity;
      
      await itemModel.findByIdAndUpdate(
        activity.itemId,
        { $inc: { currentStock: stockChange } },
        { new: true }
      );

      activity.returned = returned;
      return activity.save();
    }

    return activity;
  }

  private getItemModel(category: string): Model<any> {
    const modelMap = {
      crops: this.cropModel,
      tools: this.toolModel,
      supplies: this.suppliesModel,
      livestock: this.livestockModel
    };

    const model = modelMap[category.toLowerCase()];
    if (!model) throw new BadRequestException(`Invalid category: ${category}`);
    return model;
  }

  async updateActivity(
    activityId: string,
    updateData: UpdateActivityDto,
  ): Promise<ItemsActivityDocument> {
    // Validate IDs
    if (!this.isValidObjectId(activityId)) {
      throw new Error('Invalid activity ID format');
    }
   

    const updatedActivity = await this.itemsActivityModel.findByIdAndUpdate(
      activityId,
      {
        ...updateData,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedActivity) {
      throw new Error('Activity not found');
    }

    return updatedActivity;
  }

  private isValidObjectId(id: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}