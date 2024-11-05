import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap( ) {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter({ logger: true }));
    await app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    app.enableCors({
      origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Origin',
      credentials: true,
  });

  await app.listen(process.env.API_SERVER_PORT ?? 3000);
  
}

ConfigModule.forRoot().then(() => {
  bootstrap().then();
});
