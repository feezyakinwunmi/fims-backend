import { Module } from '@nestjs/common';
import { TodoService } from './to-do.service';
import { TodoController } from './to-do.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './to-do.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
  ],
  providers: [TodoService],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
