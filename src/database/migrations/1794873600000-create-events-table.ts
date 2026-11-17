import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventsTable1794873600000 implements MigrationInterface {
  name = 'CreateEventsTable1794873600000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "events_status_enum" AS ENUM ('planning', 'planned', 'published', 'in_organization', 'rescheduled', 'cancelled', 'held', 'closed')`,
    );
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS "events" (
    "eventId" uuid NOT NULL,
    "name" text NOT NULL,
    "status" "events_status_enum" NOT NULL,
    "date" TIMESTAMPTZ,
    "location" text,
    "budget" double precision,
    "responsibles" text[] NOT NULL DEFAULT '{}',
    "activities" text[] NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMPTZ NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,
    CONSTRAINT "PK_events_eventId" PRIMARY KEY ("eventId")
  )
`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "events"');
    await queryRunner.query('DROP TYPE "events_status_enum"');
  }
}
