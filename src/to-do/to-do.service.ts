// src/Todos/Todos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './to-do.schema'; // Import the Todo model and document type


export class CreateTodoDto {
  readonly task: string;
  readonly dueDate: string;
  readonly userId: string; // Explicit user association
}
export class UpdateTodoStatusDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsBoolean()
    isDone: boolean;
  }
@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoDocument>) {} // Use 'Todo' as the model name

 async findAllByUserAndCategory(userId: string): Promise<TodoDocument[]> {
   // Validate user ID
   if (!Types.ObjectId.isValid(userId)) {
     throw new BadRequestException('Invalid user ID format');
   }
 
   const objectId = new Types.ObjectId(userId);
 
   // Fetch Todos for the user
   const todo = await this.todoModel.find({ userId: objectId }).exec();
 
   // Log the result for debugging
   console.log(`Found ${todo.length} Todos for user ${userId}`);
 
   return todo;
 }
   
 
 
   async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
     const newTodo = new this.todoModel({
       ...createTodoDto,
       userId: new Types.ObjectId(userId), // Use 'userId' and convert to ObjectId
       isDone: false,
       createdAt: new Date()
     });
     return newTodo.save();
   }
 

  async delete(id: string, userId: string): Promise<Todo> {
     // Convert userId to ObjectId
     const objectId = new Types.ObjectId(userId);
 
     const deletedTodo = await this.todoModel.findOneAndDelete({
       _id: new Types.ObjectId(id), // Convert id to ObjectId
       userId: objectId, // Use the converted ObjectId
     }).exec();
 
     if (!deletedTodo) {
       throw new NotFoundException(
         'task not found or you don\'t have permission to delete it'
       );
     }
 
     return deletedTodo;
   
   }

   // todo.service.ts
async updateStatus(id: string, userId: string, isDone: boolean): Promise<TodoDocument> {
    // Validate IDs

  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
   
    throw new BadRequestException('Invalid ID format');
  }
    const updatedTodo = await this.todoModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId)
      },
      { isDone },
      { new: true } // Return updated document
    ).exec();
  
    if (!updatedTodo) {
      throw new NotFoundException('Task not found or unauthorized');
    }
  
    return updatedTodo;
  }
}