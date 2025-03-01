// src/Todos/Todos.controller.ts
import { Controller, Get, Post,Patch,Request, Body, Query, Req, Param, Delete, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './to-do.service';
import { TodoService } from './to-do.service';
import { User } from '../auth/schemas/user.schema';
import { Types } from 'mongoose';
import { UpdateTodoStatusDto } from './to-do.service';



@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

   @Post()
   async create(@Body() createTodoDto: CreateTodoDto) {
     // Validate userId format
     if (!Types.ObjectId.isValid(createTodoDto.userId)) {
       throw new BadRequestException('Invalid user ID format');
     }
   
     // Create the Todo
     const todo = await this.todoService.create(createTodoDto, createTodoDto.userId);
   
     return {
       message: 'Todo created successfully',
       data: todo
     };
   }
  
   // items.controller.ts
 @Get()
 async getItemsByCategory(
   @Query('userId') userId: string
 ) {
   if (!userId) {
     throw new BadRequestException('User ID is required');
   }
 
   if (!Types.ObjectId.isValid(userId)) {
     throw new BadRequestException('Invalid user ID format');
   }
 
  console.log(userId)
   
   const todo = await this.todoService.findAllByUserAndCategory(userId);
 
   // Check if Todos were found
   if (todo.length === 0) {
     throw new NotFoundException('No Todos found for this user');
   }
 
   return todo;
 }
 
 @Delete(':id')
 async deleteActivity(
   @Param('id') id: string,
   @Body('userId') userId: string,
 ) {
   return this.todoService.delete(id, userId);
 }

 // todo.controller.ts
 @Patch(':id/status')
 async updateStatus(
   @Param('id') id: string,
   @Body() updateTodoStatusDto: UpdateTodoStatusDto,
 ) {
   const { isDone, userId } = updateTodoStatusDto;
   return this.todoService.updateStatus(id, userId, isDone);
 }
 
}
