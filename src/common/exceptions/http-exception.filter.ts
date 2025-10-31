//Filter -> Filters handle exceptions (errors) thrown in your application.
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      typeof response === 'string'
        ? response
        : (response as any).message || 'Internal server error';

    res.status(status).json({
      status,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
