import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getTypeOrmConfig(config: ConfigService): TypeOrmModuleOptions {
  const url = config.get<string>('DATABASE_URL');
  const common: TypeOrmModuleOptions = {
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: false,
    ssl: config.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
  };

  return url
    ? { ...common, url }
    : {
        ...common,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASS', 'postgres'),
        database: config.get<string>('DB_NAME', '4at_consulting'),
      };
}
