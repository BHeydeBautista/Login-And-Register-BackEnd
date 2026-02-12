import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = (config.get<string>('NODE_ENV') ?? 'development') === 'production';

        const secret =
          config.get<string>('JWT_SECRET') ?? (!isProd ? 'dev_secret_change_me' : undefined);

        if (!secret) {
          throw new Error('JWT_SECRET is not set');
        }

        const expiresIn = (config.get<string>('JWT_EXPIRES_IN') ?? '1d') as StringValue;

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
