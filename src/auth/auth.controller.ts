
// src/auth/auth.controller.ts
import { Body, Controller, Post, Get,Param, HttpCode, HttpStatus, ConflictException, UnauthorizedException, Req, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetUserDto } from './dto/get-user.dto';
import { UserDocument } from './schemas/user.schema';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 


  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    try {
      const user = await this.authService.signup(signupDto);
      // Convert to plain object and remove password
      const { password, ...userWithoutPassword } = user.toObject();
      return { 
        message: 'User created successfully', 
        user: userWithoutPassword 
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        // throw error; // Re-throw specific exceptions
      }
      // throw new InternalServerErrorException('Registration failed');
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
      // throw new Error(error);
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




  @Get(':id')
@HttpCode(HttpStatus.OK)
async getUserById(@Param('id') id: string): Promise<GetUserDto> {
  try {
    const user = await this.authService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toGetUserDto(user);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to fetch user');
  }
}

private toGetUserDto(user: UserDocument): GetUserDto {
  return {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    farmName: user.farmName,
    phone: user.phone,
  };
}
}





