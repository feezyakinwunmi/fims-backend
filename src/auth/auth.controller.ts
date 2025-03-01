// // src/auth/auth.controller.ts
// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { SignupDto } from './dto/signup.dto';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('signup')
//   signup(@Body() signupDto: SignupDto) {
//     return this.authService.signup(signupDto);
//   }

//   @Post('login')
//   login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }
// }

// src/auth/auth.controller.ts
import { Body, Controller, Post, Get, HttpCode, HttpStatus, ConflictException, UnauthorizedException, Req } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign Up Endpoint
  @Post('signup')
  @HttpCode(HttpStatus.CREATED) // Return 201 Created on success
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    try {
      const user = await this.authService.signup(signupDto);
      return { message: 'User created successfully', user };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Email already exists');
      }
      throw new Error('Failed to create user');
    }
  }

  // Login Endpoint
  @Post('login')
  @HttpCode(HttpStatus.OK) // Return 200 OK on success
  async login(@Body() loginDto: LoginDto): Promise<{ message: string; token: string; userId: string }> {
        try {
      const { token, userId } = await this.authService.login(loginDto);

      return { message: 'congrats you have Loged in successful', token, userId };
    } catch (error) {
      throw new Error(error);
    }
  }

  // Verify Endpoint
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Req() req: any): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
      const user = await this.authService.findUserById(decoded.userId); // Fetch user details
      if (!user) throw new Error('User not found');
      return { user }; // Return user details
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}





