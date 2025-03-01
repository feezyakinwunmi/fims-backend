// src/Toolss/Toolss.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tools, ToolsDocument } from './Tools.schema';


export class CreateToolsDto {
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly userId: string; // Explicit user association
}
@Injectable()
export class ToolsService {
  constructor(@InjectModel('Tools') private toolsModel: Model<ToolsDocument>) {} // Use 'Tools' as the model name
 
 async findAllByUserAndCategory(userId: string): Promise<ToolsDocument[]> {
   // Validate user ID
   if (!Types.ObjectId.isValid(userId)) {
     throw new BadRequestException('Invalid user ID format');
   }
 
   const objectId = new Types.ObjectId(userId);
 
   // Fetch Toolss for the user
   const tools = await this.toolsModel.find({ userId: objectId }).exec();
 
   // Log the result for debugging
   console.log(`Found ${tools.length} Toolss for user ${userId}`);
 
   return tools;
 }
   
 
 
   async create(createToolsDto: CreateToolsDto, userId: string): Promise<Tools> {
     const newTools = new this.toolsModel({
       ...createToolsDto,
       userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
       createdAt: new Date()
     });
     return newTools.save();
   }
 }