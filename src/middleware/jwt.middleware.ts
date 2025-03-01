// src/middleware/jwt.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
      req.user = decoded; // Attach decoded payload to req.user
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
