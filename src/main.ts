import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

console.log('MongoDB URI:', process.env.MONGODB_URI); // Debug log

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust this to your Next.js app's URL
  })
  await app.listen(3002);
}
bootstrap();