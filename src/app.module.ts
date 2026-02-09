import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const common = {
          autoLoadEntities: true,
          synchronize: config.get<string>('NODE_ENV') !== 'production',
        } as const;

        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            ...common,
          };
        }

        return {
          type: 'postgres' as const,
          host: config.get<string>('DB_HOST') ?? 'localhost',
          port: Number(config.get<string>('DB_PORT') ?? 5432),
          username: config.get<string>('DB_USER') ?? 'postgres',
          password: config.get<string>('DB_PASSWORD') ?? 'postgres',
          database: config.get<string>('DB_NAME') ?? 'app',
          ...common,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
