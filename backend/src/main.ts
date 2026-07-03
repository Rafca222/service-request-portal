import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: Object.values(error.constraints ?? {}).join(', '),
        }));
        return new BadRequestException(formattedErrors);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();