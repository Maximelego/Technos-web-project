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
  await app.listen(process.env.PORT ?? 3000);
  
}

ConfigModule.forRoot().then(() => {
  bootstrap().then();
});
