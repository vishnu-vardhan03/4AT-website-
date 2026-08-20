import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '8mb' });
  app.useBodyParser('urlencoded', { limit: '8mb', extended: true });
  const config = app.get(ConfigService);
  if (config.get<string>('TRUST_PROXY') === 'true') {
    const express = app.getHttpAdapter().getInstance();
    express.set('trust proxy', 1);
  }
  app.use(helmet());
  // Union of both variables, not one-as-the-default-of-the-other: FRONTEND_URL is
  // mandatory in production, which previously made ALLOWED_ORIGINS dead configuration.
  const configured = [config.get<string>('FRONTEND_URL'), config.get<string>('ALLOWED_ORIGINS')]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(','))
    .map((origin) => origin.trim())
    .filter(Boolean);
  const origins = [...new Set(configured.length ? configured : ['http://localhost:3000'])];
  app.enableCors({ origin: origins, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  const port = Number(process.env.PORT) || 5000;
  await app.listen(port);
  logger.log(`Backend running on port ${port}`);
}
void bootstrap().catch((error: unknown) => {
  const logger = new Logger('Bootstrap');
  logger.error('Backend failed to start', error instanceof Error ? error.stack : undefined);
  process.exitCode = 1;
});
