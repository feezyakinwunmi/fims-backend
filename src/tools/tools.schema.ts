// src/Toolss/Tools.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

// Define the Tools model
@Schema()
export class Tools {
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

// Export the ToolsDocument type
export type ToolsDocument = Tools & Document;

// Export the ToolsSchema
export const ToolsSchema = SchemaFactory.createForClass(Tools);