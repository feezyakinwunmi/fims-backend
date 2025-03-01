import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true})
  lastName: string;
  @Prop({ required: true })
  farmName: string;
  @Prop({ required: true, unique: true })
  phone: number;

  @Prop({ required: true })
  password: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);