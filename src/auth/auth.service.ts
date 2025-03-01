

// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Sign Up Method
  async signup(signupDto: SignupDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: signupDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create a new user
    const newUser = new this.userModel({
      email: signupDto.email,
      password: hashedPassword,
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      farmName: signupDto.farmName,
      phone: signupDto.phone,
    });

    return newUser.save();
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
async findUserById(userId: string): Promise<UserDocument | null> {
  return this.userModel.findById(userId).select('-password').exec(); // Exclude password for security
}

}