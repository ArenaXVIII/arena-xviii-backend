import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CreateEventsTable1794873600000 } from './database/migrations/1794873600000-create-events-table.js';
import { EventsModule } from './modules/events/events.module.js';

const isTestRuntime = process.env.NODE_ENV === 'test';

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

@Module({
  imports: [
    ...(isTestRuntime
      ? []
      : [
          TypeOrmModule.forRootAsync({
            useFactory: () => ({
              type: 'postgres' as const,
              host: requiredEnvironmentVariable('DB_HOST'),
              port: Number(process.env.DB_PORT ?? '5432'),
              username: requiredEnvironmentVariable('DB_USERNAME'),
              password: requiredEnvironmentVariable('DB_PASSWORD'),
              database: requiredEnvironmentVariable('DB_NAME'),
              autoLoadEntities: true,
              synchronize: false,
              migrationsRun: false,
              migrationsTableName: 'migrations',
              migrations: [CreateEventsTable1794873600000],
            }),
          }),
        ]),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
