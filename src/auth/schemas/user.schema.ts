

// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Let Mongoose handle _id and timestamps
export class User extends Document {
  @Prop({ 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  farmName: string;

  @Prop({ required: true, unique: true })
  phone: string; // Changed to string as numbers can have formatting issues

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;