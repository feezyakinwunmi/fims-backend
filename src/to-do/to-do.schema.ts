// src/crops/crop.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Define the Crop model
@Schema()
export class Todo {

  
  @Prop({ required: false })
  task: string;

  @Prop({ required: false })
  dueDate: string;

  @Prop({ default: false }) // Add status field with default
  isDone: boolean;


   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
   userId: Types.ObjectId; // Link items to the logged-in user
 
   @Prop({ default: Date.now })
   createdAt: Date;
}

// Export the CropDocument type
export type TodoDocument = Todo & Document;

// Export the CropSchema
export const TodoSchema = SchemaFactory.createForClass(Todo);