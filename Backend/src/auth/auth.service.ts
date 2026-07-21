import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateLogin(username: string, password: string): Promise<{ role: 'admin' } | null> {
    const adminUsername = process.env.ADMIN_USERNAME;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminUsername || !passwordHash || username !== adminUsername) return null;
    return (await bcrypt.compare(password, passwordHash)) ? { role: 'admin' } : null;
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const admin = await this.validateLogin(username, password);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    return { accessToken: await this.jwtService.signAsync({ sub: 'admin', role: admin.role }) };
  }
}
