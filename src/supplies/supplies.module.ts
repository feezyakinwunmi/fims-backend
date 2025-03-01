// src/tools/tools.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuppliesController } from './supplies.controller';
import { SuppliesService } from './supplies.service';
import { SuppliesSchema } from './supplies.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Supplies', schema: SuppliesSchema }]), // Register the model
  ],
  controllers: [SuppliesController],
  providers: [SuppliesService],
})
export class SuppliesModule {}