import { DataSource } from 'typeorm';
import { ConfigUtil } from '@lib/config';

const options = ConfigUtil.get('db');

export default new DataSource({
  ...options,
  entities: ['src/modules/**/entities/*.entity.{ts, js}'],
  migrations: ['migrations/*.{ts, js}'],
  migrationsTableName: '_migrations',
});
