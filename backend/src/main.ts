import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({  //what runs the dto
      whitelist: true,  //removes extra given by customer if not in the dto
      transform: true, //transforms coming data into dtos
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
