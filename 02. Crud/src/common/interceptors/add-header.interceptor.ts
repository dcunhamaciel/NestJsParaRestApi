import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    response.setHeader('X-Custom-Header', 'O valor do cabeçalho personalizado');

    return next.handle();
  }
}
