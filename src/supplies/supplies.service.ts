// src/Suppliess/Suppliess.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Supplies, SuppliesDocument } from './supplies.schema';


export class CreateSuppliesDto {
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly userId: string; // Explicit user association
}
export class UpdateSuppliesDto {
  readonly quantity?: number;
  readonly currentStock?: number;
  readonly price?: number;
  readonly totalSales?: number;
  readonly totalPurchases?: number;
}
@Injectable()
export class SuppliesService {
  constructor(@InjectModel('Supplies') private suppliesModel: Model<SuppliesDocument>) {} // Use 'Supplies' as the model name

async findAllByUserAndCategory(userId: string): Promise<SuppliesDocument[]> {
  // Validate user ID
  if (!Types.ObjectId.isValid(userId)) {
    throw new BadRequestException('Invalid user ID format');
  }

  const objectId = new Types.ObjectId(userId);

  // Fetch Suppliess for the user
  const supplies = await this.suppliesModel.find({ userId: objectId }).exec();

  // Log the result for debugging
  console.log(`Found ${supplies.length} Suppliess for user ${userId}`);

  return supplies;
}
  
// NEW METHOD: Find single supply by ID
async findOne(_id: string): Promise<SuppliesDocument> {
  if (!Types.ObjectId.isValid(_id)) {
    throw new BadRequestException('Invalid supply ID format');
  }

  const supply = await this.suppliesModel.findById(_id).exec();
  if (!supply) {
    throw new NotFoundException('Supply not found');
  }
  return supply;
}


  async create(createSuppliesDto: CreateSuppliesDto, userId: string): Promise<Supplies> {
    const newSupplies = new this.suppliesModel({
      ...createSuppliesDto,
      userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
      createdAt: new Date()
    });
    return newSupplies.save();
  }

  async updateSupplies(
    supplyId: string,
    updateData: UpdateSuppliesDto
  ): Promise<SuppliesDocument> {
    if (!Types.ObjectId.isValid(supplyId)) {
      throw new BadRequestException('Invalid ID format');
    }

    const objectId = new Types.ObjectId(supplyId);

    const updatedSupply = await this.suppliesModel.findOneAndUpdate(
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

    if (!updatedSupply) {
      throw new NotFoundException('Supply not found');
    }

    return updatedSupply;
  }
}