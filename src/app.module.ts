import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as modules from './modules';
import { JwtErrorFilter } from '@lib/auth';
import { databaseOptions, EntityNotFoundFilter } from '@lib/database';

@Module({
  imports: [TypeOrmModule.forRoot(databaseOptions), ...Object.values(modules)],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        enableDebugMessages: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundFilter,
    },
    {
      provide: APP_FILTER,
      useClass: JwtErrorFilter,
    },
  ],
})
export class AppModule {}
