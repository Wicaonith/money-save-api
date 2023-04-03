import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { ConfigService } from 'src/core/config/config.service';

async function bootstrap() {


  // NestJS factory => API
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'], // type possibles false, 'log', 'error', 'warn', 'debug', et 'verbose'.
  });
  // Configuration
  const configEnv = new ConfigService();

  app.use(cookieParser());
  //Cross-origin resource sharing (CORS) 
  app.enableCors();

  // Swagger ------------------------------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Bugdetiz API')
    .setDescription('Bugdetiz API')
    .setVersion('B.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // --------------------------------------------------------------------------

  console.log(` `);
  console.log(`=======================================================`);
  console.log(`Lecture des routes de l'API`);
  console.log(`=======================================================`);
  console.log(` `);

  // Ecoute du port 3000 ------------------------------------------------------
  await app.listen(process.env.PORT || await configEnv.getPortConfig());

  console.log(` `);
  console.log(`=======================================================`);
  console.log('Application lancé sur le PORT:' + process.env.PORT || await configEnv.getPortConfig());
  console.log(`=======================================================`);
  console.log(` `);
  // --------------------------------------------------------------------------
}
bootstrap();
