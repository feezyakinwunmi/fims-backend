// src/Livetocks/Livetocks.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Livestock, LivestockDocument } from './livestock.schema'; // Import the Livetock model and document type

export class CreateLivestockDto {
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly userId: string; // Explicit user association
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
  }