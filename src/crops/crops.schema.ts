// src/crops/crop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {User} from '../auth/schemas/user.schema';
// Define the Crop model
@Schema()
export class Crop {
  @Prop({ required: false })
  name: string;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: 0  })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Link items to the logged-in user

  @Prop({ default: 0 })
  totalSales: number;

  @Prop({ default: 0 })
  totalPurchases: number;


  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: 0 })
  currentStock: number;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

// Export the CropDocument type
export type CropDocument = Crop & Document;

// Export the CropSchema
export const CropSchema = SchemaFactory.createForClass(Crop);