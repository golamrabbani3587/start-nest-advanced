import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import { AllExceptionsFilter } from './common/exceptions/http-exception.filter';



async function bootstrap() { 
  const app = await NestFactory.create(AppModule);

  // ✅ Global validation (for DTOs)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Global interceptor (logs request times)
  app.useGlobalInterceptors(new LoggingInterceptor());

  // ✅ Global filter (catches exceptions globally)
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}
bootstrap();
