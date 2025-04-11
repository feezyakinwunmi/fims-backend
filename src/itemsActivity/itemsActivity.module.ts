import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemsActivityController } from './itemsActivity.controller';
import { ItemsActivityService } from './itemsActivity.service';
import { ItemsActivity, ItemsActivitySchema } from './schemas/itemsActivity.schema';
import { CropSchema } from "../crops/crops.schema" //Import CropSchema
import { ToolsSchema } from "../tools/tools.schema"; //Import ToolSchema
import { SuppliesSchema } from "../supplies/supplies.schema"; //Import SuppliesSchema
import { LivestockSchema } from "../livestock/livestock.schema"; //Import LivestockSchema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemsActivity.name, schema: ItemsActivitySchema }]),
    // Import other models you need to reference
    MongooseModule.forFeature([{ name: 'Crop', schema: CropSchema }]),
    MongooseModule.forFeature([{ name: 'Tool', schema: ToolsSchema }]),
    MongooseModule.forFeature([{ name: 'Supplies', schema: SuppliesSchema }]),
    MongooseModule.forFeature([{ name: 'Livestock', schema: LivestockSchema }]),
  ],
  controllers: [ItemsActivityController],
  providers: [ItemsActivityService],

})
export class ItemsActivityModule {}
