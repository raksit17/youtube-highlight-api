
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://192.168.1.21:5173',
    ],
    methods: [
      'GET',
      'POST',
      'PATCH',
      'PUT',
      'DELETE',
      'OPTIONS',
    ],
  });

  app.setGlobalPrefix('api/v1');

  app.useBodyParser('json', {
    limit: '50mb',
  });

  const port = Number(process.env.PORT ?? 3001);

  await app.listen(port);

  console.log(
    `Server running on http://localhost:${port}`,
  );
}

void bootstrap();
