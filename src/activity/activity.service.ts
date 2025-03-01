// src/Activitys/Activitys.service.ts
import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './activity.schema'; // Import the Activity model and document type


export class CreateActivityDto {
  readonly activity: string;
  readonly userId: string; // Explicit user association
}
@Injectable()
export class ActivityService {
  constructor(@InjectModel('Activity') private activityModel: Model<ActivityDocument>) {} // Use 'Activity' as the model name

 async findAllByUserAndCategory(userId: string): Promise<ActivityDocument[]> {
   // Validate user ID
   if (!Types.ObjectId.isValid(userId)) {
     throw new BadRequestException('Invalid user ID format');
   }
 
   const objectId = new Types.ObjectId(userId);
 
   // Fetch Activitys for the user
   const activity = await this.activityModel.find({ userId: objectId }).exec();
 
   // Log the result for debugging
   console.log(`Found ${activity.length} Activitys for user ${userId}`);
 
   return activity;
 }
   
 
 
   async create(createActivityDto: CreateActivityDto, userId: string): Promise<Activity> {
     const newActivity = new this.activityModel({
       ...createActivityDto,
       userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
       createdAt: new Date()
     });
     return newActivity.save();
   }
 

   async delete(id: string, userId: string): Promise<Activity> {
    // Convert userId to ObjectId
    const objectId = new Types.ObjectId(userId);

    const deletedActivity = await this.activityModel.findOneAndDelete({
      _id: new Types.ObjectId(id), // Convert id to ObjectId
      userId: objectId, // Use the converted ObjectId
    }).exec();

    if (!deletedActivity) {
      throw new NotFoundException(
        'Activity not found or you don\'t have permission to delete it'
      );
    }

    return deletedActivity;
  
  }
}