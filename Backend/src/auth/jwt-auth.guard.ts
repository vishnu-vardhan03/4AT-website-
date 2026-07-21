import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { AdminJwtPayload } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AdminJwtPayload>(err: unknown, user: AdminJwtPayload | false): TUser {
    if (err || !user || user.role !== 'admin') throw err || new UnauthorizedException();
    return user as TUser;
  }
}
