// // src/crops/seed-crops.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Crop } from './crops.schema';
// import { CropsService } from './crops.service';


// @Injectable()
// export class CropsSeeder {
//     constructor(private readonly cropsService: CropsService) {}

//   async seedCrops() {
//     const predefinedCrops = [
//     ];

//       await this.cropsService.create(predefinedCrops); // Use a bulk creation method

//   }
// }