import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigUtil } from '@lib/config';

const options = ConfigUtil.get('db');

export const databaseOptions: TypeOrmModuleOptions = {
  ...options,
  autoLoadEntities: true,
};
