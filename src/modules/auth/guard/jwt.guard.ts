import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { PUBLIC } from '@lib/auth';
import { ConfigUtil } from '@lib/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];

    if (!token || type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException();
    }

    request.user = await this.jwtService.verifyAsync(token, {
      secret: ConfigUtil.get('jwt.accessToken.secret'),
    });
    request.user.id = request.user.sub;

    return true;
  }
}
