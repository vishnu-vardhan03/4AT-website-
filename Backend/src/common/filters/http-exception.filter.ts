import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = exception instanceof HttpException ? exception.getResponse() : null;
    const objectBody = typeof body === 'object' && body !== null ? body : {};
    const rawMessage =
      'message' in objectBody
        ? (objectBody as { message: string | string[] }).message
        : typeof body === 'string'
          ? body
          : 'Internal server error';
    const error =
      'error' in objectBody && typeof (objectBody as { error?: unknown }).error === 'string'
        ? (objectBody as { error: string }).error
        : HttpStatus[status] ?? 'Error';

    response.status(status).json({
      statusCode: status,
      message: rawMessage,
      error,
    });
  }
}
