import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateLogin(username: string, password: string): Promise<{ role: 'admin' } | null> {
    const adminUsername = this.config.get<string>('ADMIN_USERNAME');
    const passwordHash = this.config.get<string>('ADMIN_PASSWORD_HASH');

    // Fail closed: without both an explicit username and a bcrypt hash there is no admin
    // account. Never fall back to a default username or to a literal password.
    if (!adminUsername || !passwordHash) {
      this.logger.error('Admin login rejected: ADMIN_USERNAME and ADMIN_PASSWORD_HASH must both be set.');
      return null;
    }

    if (username !== adminUsername) return null;
    if (await bcrypt.compare(password, passwordHash)) return { role: 'admin' };
    return null;
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const admin = await this.validateLogin(username, password);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    return { accessToken: await this.jwtService.signAsync({ sub: 'admin', role: admin.role }) };
  }
}
