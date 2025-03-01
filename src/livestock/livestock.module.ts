// src/tools/tools.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivestockController } from './livestock.controller';
import { LivestockService } from './livestock.service';
import { LivestockSchema } from './livestock.schema'; // Import the schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Livestock', schema: LivestockSchema }]), // Register the model
  ],
  controllers: [LivestockController],
  providers: [LivestockService],
})
export class LivestockModule {}