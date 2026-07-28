import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  if (config.get<string>('TRUST_PROXY') === 'true') app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.use(helmet());
  const origins = config
    .get<string>('FRONTEND_URL', config.get<string>('ALLOWED_ORIGINS', 'http://localhost:3000'))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('4AT Consulting API')
    .setDescription('Lead collection and dashboard API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  if (config.get<string>('ENABLE_SWAGGER', 'false') === 'true') {
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));
  }
  const port = Number(process.env.PORT) || 5000;
  await app.listen(port);
  logger.log(`Backend running on port ${port}`);
}
void bootstrap().catch((error: unknown) => {
  const logger = new Logger('Bootstrap');
  logger.error('Backend failed to start', error instanceof Error ? error.stack : undefined);
  process.exitCode = 1;
});
