import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt.guard';
import { User } from '../user/entities/user.entity';
import { ConfigUtil } from '@lib/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      signOptions: {
        algorithm: 'HS512',
        ...ConfigUtil.get('jwt.options'),
      },
      verifyOptions: {
        algorithms: ['HS512'],
        ...ConfigUtil.get('jwt.options'),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
