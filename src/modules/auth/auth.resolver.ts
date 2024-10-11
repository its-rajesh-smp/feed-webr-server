import { User } from '@common/decorators/user.decorator';
import { comparePassword, hashPassword } from '@common/utils/bcrypt.util';
import { getEnv } from '@common/utils/env.util';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/AuthGuard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation('login')
  async login(@Args('userInput') userInput: LoginDto) {
    const existingUser = await this.authService.findOne({
      email: userInput.email,
    });

    // if user dose not exists then throw error
    if (!existingUser) {
      throw new Error('User does not exist');
    }

    const isPasswordMatched = await comparePassword(
      userInput.password,
      existingUser.password,
    );

    // if password is incorrect then throw error
    if (!isPasswordMatched) {
      throw new Error('Password is incorrect');
    }

    // creating idToken
    const idToken = await this.jwtService.signAsync(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      {
        secret: getEnv('JWT_SECRET'),
      },
    );

    return {
      ...existingUser,
      idToken,
    };
  }

  @Mutation('register')
  async register(@Args('userInput') userInput: RegisterDto) {
    const existingUser = await this.authService.findOne({
      email: userInput.email,
    });

    // if user already exists then throw error
    if (existingUser) {
      console.log(existingUser);
      throw new Error('User already exists');
    }

    // hashed the user's password
    userInput.password = await hashPassword(userInput.password);

    // creating new user
    const newUser = await this.authService.create(userInput);

    // creating idToken
    const idToken = await this.jwtService.signAsync(
      {
        id: newUser.id,
        email: newUser.email,
      },
      {
        secret: getEnv('JWT_SECRET'),
      },
    );

    return {
      ...newUser,
      idToken,
    };
  }

  @UseGuards(AuthGuard)
  @Query('fetchUser')
  async fetchUser(@User() user) {
    return user;
  }
}
