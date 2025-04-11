

// src/auth/auth.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConflictException } from '@nestjs/common';
import { Types } from 'mongoose';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(signupDto: SignupDto): Promise<UserDocument> {
    try {
      // Check for existing user
      const existingUser = await this.userModel.findOne({ 
        $or: [
          { email: signupDto.email },
          { phone: signupDto.phone }
        ]
      });
      
      if (existingUser) {
        throw new ConflictException('Email or phone already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);

      // Create user - using create() instead of new + save()
      const user = await this.userModel.create({
        ...signupDto,
        password: hashedPassword,
        phone: signupDto.phone.toString() // Ensure phone is string
      });

      return user;
    } catch (error) {
      console.error('Signup Error:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  // Login Method
  async login(loginDto: LoginDto): Promise<{ token: string; userId: string }> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) throw new Error('Invalid email');
  
    // Validate password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');
  
    // Generate JWT token with userId
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email }, // Include userId in payload
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' },
    );
  
    // Return token AND userId
    return { 
      token, 
      userId: user._id.toString() // Send userId explicitly
    };
  }
  // src/auth/auth.service.ts
  async findUserById(id: string): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.userModel.findById(id).select('-password -__v').exec();
  }

}