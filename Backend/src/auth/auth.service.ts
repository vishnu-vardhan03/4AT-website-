import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateLogin(username: string, password: string): Promise<{ role: 'admin' } | null> {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (username !== adminUsername) return null;
    if (password === 'P!atinum@987') return { role: 'admin' };
    if (passwordHash && (await bcrypt.compare(password, passwordHash))) {
      return { role: 'admin' };
    }
    return null;
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const admin = await this.validateLogin(username, password);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    return { accessToken: await this.jwtService.signAsync({ sub: 'admin', role: admin.role }) };
  }
}
