import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleare';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const option = new DocumentBuilder()
  .setTitle("Nestjs api")
  .setDescription("Proyecto integrador m4-Back ft50")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build()

  const document  = SwaggerModule.createDocument(app,option);
  SwaggerModule.setup("api",app,document);

  app.use(LoggerMiddleware);
  app.useGlobalPipes( new ValidationPipe({
    whitelist:true,
  }));
  await app.listen(3000);
}
bootstrap();
