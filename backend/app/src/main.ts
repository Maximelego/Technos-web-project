import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost', 'http://localhost:80', 'frontend-app:80', 'http://[::]:80'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Origin',
    credentials: true,
});

  await app.listen(process.env.PORT ?? 3000);
}

ConfigModule.forRoot().then(() => {
  bootstrap().then();
});
