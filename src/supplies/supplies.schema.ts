// src/Suppliess/Supplies.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the Supplies model
@Schema()
export class Supplies {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  quantity: number;

  @Prop({ required: false })
  price: number;

   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
   userId: Types.ObjectId; // Link items to the logged-in user
 
   @Prop({ default: Date.now })
   createdAt: Date;
}

// Export the SuppliesDocument type
export type SuppliesDocument = Supplies & Document;

// Export the SuppliesSchema
export const SuppliesSchema = SchemaFactory.createForClass(Supplies);