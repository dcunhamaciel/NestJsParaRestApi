import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class MyExceptionFilter<
  T extends BadRequestException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse;

    response.status(statusCode).json({
      ...error,
      path: request.url,
      data: new Date().toISOString(),
    });
  }
}
