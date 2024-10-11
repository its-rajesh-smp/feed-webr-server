import { getEnv } from '@common/utils/env.util';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req; // Extract the request object from the context

    // Get the Authorization header
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false; // If no token is provided, deny access
    }

    const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"

    if (!token) {
      return false; // If no token is found, deny access
    }

    try {
      // Verify the token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: getEnv('JWT_SECRET'),
      });

      const user = await this.authService.findOneById(payload.id);

      if (!user) {
        return false;
      }

      // Optionally, attach the user information to the request object
      request.user = user;

      return true; // Allow access if token is valid
    } catch (error) {
      return false; // Deny access if token is invalid
    }
  }
}
