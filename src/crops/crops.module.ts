// src/tools/tools.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { CropSchema } from './crops.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Crop', schema: CropSchema }]), // Register the model
  ],
  controllers: [CropsController],
  providers: [CropsService],
  exports: [CropsService],
})
export class CropsModule {}