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
      origin: 'http://127.0.0.1:4200',  
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Origin',
    });

  await app.listen(process.env.PORT ?? 8000);
  
}

ConfigModule.forRoot().then(() => {
  bootstrap().then();
});
