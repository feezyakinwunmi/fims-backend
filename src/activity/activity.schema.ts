// src/crops/crop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the Crop model
@Schema()
export class Activity {

  
  @Prop({ required: false })
  activity: string;

   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
   userId: Types.ObjectId; // Link items to the logged-in user
 
   @Prop({ default: Date.now })
   createdAt: Date;
}

// Export the CropDocument type
export type ActivityDocument = Activity & Document;

// Export the CropSchema
export const ActivitySchema = SchemaFactory.createForClass(Activity);