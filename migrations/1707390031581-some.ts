import { MigrationInterface, QueryRunner } from "typeorm";

export class Some1707390031581 implements MigrationInterface {
    name = 'Some1707390031581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "something" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_250357bbacf2a93199c7f2acf0c" UNIQUE ("something"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "createdAt", "updatedAt", "firstname", "lastname", "email", "password") SELECT "id", "createdAt", "updatedAt", "firstname", "lastname", "email", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "createdAt", "updatedAt", "firstname", "lastname", "email", "password") SELECT "id", "createdAt", "updatedAt", "firstname", "lastname", "email", "password" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
