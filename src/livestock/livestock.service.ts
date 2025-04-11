// src/Livetocks/Livetocks.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Livestock, LivestockDocument } from './livestock.schema'; // Import the Livetock model and document type

export class CreateLivestockDto {
  readonly name: string;
  // readonly quantity: number;
  // readonly price: number;
  readonly userId: string; // Explicit user association
}

export class UpdateLivestockDto {
  readonly quantity?: number;
  readonly currentStock?: number;
  readonly price?: number;
  readonly totalSales?: number;
  readonly totalPurchases?: number;
}
@Injectable()
export class LivestockService {
  constructor(@InjectModel('Livestock') private livestockModel: Model<LivestockDocument>) {} // Use 'Livestock' as the model name

  async findAllByUserAndCategory(userId: string): Promise<LivestockDocument[]> {
    // Validate user ID
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
  
    const objectId = new Types.ObjectId(userId);
  
    // Fetch Livestocks for the user
    const livestocks = await this.livestockModel.find({ userId: objectId }).exec();
  
    // Log the result for debugging
    console.log(`Found ${livestocks.length} Livestocks for user ${userId}`);
  
    return livestocks;
  }
    
  
  
    async create(createLivestockDto: CreateLivestockDto, userId: string): Promise<Livestock> {
      const newLivestock = new this.livestockModel({
        ...createLivestockDto,
        userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
        createdAt: new Date()
      });
      return newLivestock.save();
    }

    async updateLivestock(
      livestockId: string,
      updateData: UpdateLivestockDto
    ): Promise<LivestockDocument> {
      if (!Types.ObjectId.isValid(livestockId)) {
        throw new BadRequestException('Invalid ID format');
      }
  
      const objectId = new Types.ObjectId(livestockId);
  
      const updatedLivestock = await this.livestockModel.findOneAndUpdate(
        { _id: objectId },
        {
          ...updateData,
          updatedAt: new Date()
        },
        {
          new: true,
          runValidators: true
        }
      );
  
      if (!updatedLivestock) {
        throw new NotFoundException('Livestock not found');
      }
  
      return updatedLivestock;
    }
  }