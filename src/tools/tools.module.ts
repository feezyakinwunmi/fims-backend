// src/tools/tools.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { ToolsSchema } from './tools.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tools', schema: ToolsSchema }]), // Register the model
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}