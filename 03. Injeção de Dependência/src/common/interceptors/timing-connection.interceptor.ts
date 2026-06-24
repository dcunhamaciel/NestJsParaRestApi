import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const before = Date.now();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(() => {
        const after = Date.now();
        const time = after - before;
        console.log(`A requisição demorou ${time}ms`);
      }),
    );
  }
}
