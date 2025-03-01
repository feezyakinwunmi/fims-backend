// src/Suppliess/Suppliess.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Supplies, SuppliesDocument } from './supplies.schema';


export class CreateSuppliesDto {
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly userId: string; // Explicit user association
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
  


  async create(createSuppliesDto: CreateSuppliesDto, userId: string): Promise<Supplies> {
    const newSupplies = new this.suppliesModel({
      ...createSuppliesDto,
      userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
      createdAt: new Date()
    });
    return newSupplies.save();
  }
}