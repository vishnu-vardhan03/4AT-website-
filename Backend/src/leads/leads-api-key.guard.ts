import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { timingSafeEqual } from 'node:crypto';

@Injectable()
export class LeadsApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const configuredKey = this.config.get<string>('LEADS_API_KEY');
    if (!configuredKey) {
      throw new ServiceUnavailableException('Lead dashboard access is not configured');
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header('authorization');
    const suppliedKey = authorization?.startsWith('Bearer ') ? authorization.slice(7) : request.header('x-api-key');

    if (!suppliedKey || !this.keysMatch(suppliedKey, configuredKey)) {
      throw new UnauthorizedException('Invalid lead dashboard credentials');
    }
    return true;
  }

  private keysMatch(supplied: string, configured: string): boolean {
    const suppliedBuffer = Buffer.from(supplied);
    const configuredBuffer = Buffer.from(configured);
    return suppliedBuffer.length === configuredBuffer.length && timingSafeEqual(suppliedBuffer, configuredBuffer);
  }
}
