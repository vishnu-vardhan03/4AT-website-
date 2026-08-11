import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import type { Request } from 'express';

@Injectable()
export class EsslInternalGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>('ESSL_INTERNAL_API_KEY')
      ?? (this.config.get<string>('NODE_ENV') === 'production' ? undefined : '4at-local-development-essl-api-key-not-for-production');
    const supplied = context.switchToHttp().getRequest<Request>().header('x-essl-internal-key');
    if (!expected || !supplied) throw new UnauthorizedException('ESSL service authentication is required');

    const expectedBytes = Buffer.from(expected);
    const suppliedBytes = Buffer.from(supplied);
    if (expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) {
      throw new UnauthorizedException('ESSL service authentication is required');
    }
    return true;
  }
}
