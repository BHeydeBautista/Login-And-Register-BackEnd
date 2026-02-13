import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static assets (branding for docs UI)
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public/' });

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const corsOrigin = process.env.CORS_ORIGIN;
  if (corsOrigin) {
    app.enableCors({
      origin: corsOrigin.split(',').map((o) => o.trim()),
      credentials: true,
    });
  } else if (process.env.NODE_ENV !== 'production') {
    app.enableCors({ origin: true, credentials: true });
  }

  const swaggerEnabled =
    process.env.SWAGGER_ENABLED === 'true' || process.env.NODE_ENV !== 'production';

  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('SYSTEMIUM API')
      .setDescription('Technology & Development — Auth (JWT) + Users API')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'JWT',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document, {
      customSiteTitle: 'SYSTEMIUM — API Docs',
      customCssUrl: '/public/swagger-custom.css',
      customJs: '/public/swagger-custom.js',
      customfavIcon: '/public/systemium-favicon.svg',
      swaggerOptions: {
        persistAuthorization: false,
        supportedSubmitMethods: [],
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
      },
    });
  }

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap().catch((error) => {
  console.error('Nest application failed to start', error);
  process.exit(1);
});
