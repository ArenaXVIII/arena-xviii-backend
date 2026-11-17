import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CreateEventsTable1794873600000 } from './migrations/1794873600000-create-events-table.js';
import { EventOrmEntity } from '../modules/events/persistence/event.orm-entity.js';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const dataSource = new DataSource({
  type: 'postgres',
  host: requiredEnvironmentVariable('DB_HOST'),
  port: Number(process.env.DB_PORT ?? '5432'),
  username: requiredEnvironmentVariable('DB_USERNAME'),
  password: requiredEnvironmentVariable('DB_PASSWORD'),
  database: requiredEnvironmentVariable('DB_NAME'),
  entities: [EventOrmEntity],
  migrations: [CreateEventsTable1794873600000],
  migrationsTableName: 'migrations',
  synchronize: false,
});

export default dataSource;
