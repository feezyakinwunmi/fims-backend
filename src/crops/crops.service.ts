// src/crops/crops.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Crop, CropDocument } from './crops.schema'; // Import the Crop model and document type


export class CreateCropDto {
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly userId: string; // Explicit user association
}
@Injectable()
export class CropsService {
  constructor(@InjectModel('Crop') private cropModel: Model<CropDocument>) {} // Use 'Crop' as the model name

async findAllByUserAndCategory(userId: string): Promise<CropDocument[]> {
  // Validate user ID
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException('Invalid user ID format');
  }

  const objectId = new Types.ObjectId(userId);

  // Fetch crops for the user
  const crops = await this.cropModel.find({ userId: objectId }).exec();

  // Log the result for debugging
  console.log(`Found ${crops.length} crops for user ${userId}`);

  return crops;
}
  


  async create(createCropDto: CreateCropDto, userId: string): Promise<Crop> {
    const newCrop = new this.cropModel({
      ...createCropDto,
      userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
      createdAt: new Date()
    });
    return newCrop.save();
  }
}