import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigUtil } from '@lib/config';
import { version } from 'package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = ConfigUtil.get('port', 3000);
  const swagger = ConfigUtil.get('swagger');

  const swaggerDocument = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(version)
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    swagger.path,
    app,
    SwaggerModule.createDocument(app, swaggerDocument),
    {
      swaggerOptions: {
        tagsSorter: 'alpha',
      },
    },
  );

  await app.listen(port, () => {
    Logger.log(`Starting server on port ${port}`);
  });
}
void bootstrap();
