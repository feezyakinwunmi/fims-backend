// src/crops/crops.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Crop, CropDocument } from './crops.schema'; // Import the Crop model and document type


export class CreateCropDto {
  readonly name: string;
  // readonly quantity: number;
  // readonly price: number;
  readonly userId: string; // Explicit user association
}
export class UpdateCropDto {
  readonly quantity?: number;
  readonly currentStock?: number;
  readonly price?: number;
  readonly totalSales?: number;
  readonly totalPurchases?: number;
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


  async updateCrop(
    cropId: string,
    updateData: UpdateCropDto,
    // userId: string
  ): Promise<CropDocument> {
    // Validate IDs
    if (!Types.ObjectId.isValid(cropId)) {
      throw new BadRequestException('Invalid ID format');
    }

    const objectId = new Types.ObjectId(cropId);
    // const userObjectId = new Types.ObjectId(userId);

    // Find and update the crop
    const updatedCrop = await this.cropModel.findOneAndUpdate(
      {
        _id: objectId,
        // userId: userObjectId // Ensure user owns this crop
      },
      {
        ...updateData,
        updatedAt: new Date()
      },
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validators on update
      }
    );

    if (!updatedCrop) {
      throw new NotFoundException('Crop not found or you dont have permission');
    }

    return updatedCrop;
  }



}