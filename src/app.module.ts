import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { CropsModule } from './crops/crops.module';
import { ToolsModule } from './tools/tools.module';
import { LivestockModule } from './livestock/livestock.module';
import { SuppliesModule } from './supplies/supplies.module';
// import { CropsSeeder } from './crops/seed-crops';
import { ActivityService } from './activity/activity.service';
import { ActivityController } from './activity/activity.controller';
import { ActivityModule } from './activity/activity.module';
import { TodoModule } from './to-do/to-do.module';
import { ItemsActivityModule } from './itemsActivity/itemsActivity.module';



dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CropsModule,
    ToolsModule,
    LivestockModule,
    SuppliesModule,
    ActivityModule,
    TodoModule,
    ItemsActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    // CropsSeeder
  ],
})
export class AppModule {
  constructor(
    // private cropsSeeder: CropsSeeder,
    // private toolsSeeder: ToolsSeeder,
    // private livestockSeeder: LivestockSeeder,
    // private suppliesSeeder: SuppliesSeeder,
  ) {}

  async onApplicationBootstrap() {
    // await this.cropsSeeder.seedCrops();
    // await this.toolsSeeder.seedTools();
    // await this.livestockSeeder.seedLivestock();
    // await this.suppliesSeeder.seedSupplies();
  }
  configure(consumer: any) {
    consumer.apply(JwtMiddleware).forRoutes('auth/verify',); // Apply middleware to /auth/verify
  }
}