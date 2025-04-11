// src/Livestocks/Livestock.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the Livestock model
@Schema()
export class Livestock {
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

     @Prop({ default: 0 })
     totalSales: number;
   
     @Prop({ default: 0 })
     totalPurchases: number;
   

 @Prop({ default: 0 })
  currentStock: number;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

// Export the LivestockDocument type
export type LivestockDocument = Livestock & Document;

// Export the LivestockSchema
export const LivestockSchema = SchemaFactory.createForClass(Livestock);