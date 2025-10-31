import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { appLogger } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const start = Date.now();

    appLogger.info(`➡️  ${method} ${url} - Request started`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        appLogger.info(`✅  ${method} ${url} - Completed in ${duration}ms`);
      }),
      catchError((err) => {
        const duration = Date.now() - start;
        const errorMessage = err.message || 'Unknown error';
        const statusCode = err.status || 500;

        appLogger.error(
          `❌  ${method} ${url} - ${statusCode} (${duration}ms): ${errorMessage}\n${err.stack || ''}`
        );

        return throwError(() => err);
      }),
    );
  }
}
