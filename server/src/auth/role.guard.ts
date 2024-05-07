import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtRolesGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        request.user = decoded;

        if (request.user.statusUser === 1) {
          return true;
        } else {
          throw new UnauthorizedException(
            'You do not have permission to access this resource.',
          );
        }
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }