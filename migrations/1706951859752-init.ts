import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1706951859752 implements MigrationInterface {
  name = 'Init1706951859752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog_posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "body" varchar NOT NULL, "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "email" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_blog_posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "body" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_1e492cd6e733576f85cff2912fb" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_blog_posts"("id", "createdAt", "updatedAt", "title", "body", "userId") SELECT "id", "createdAt", "updatedAt", "title", "body", "userId" FROM "blog_posts"`,
    );
    await queryRunner.query(`DROP TABLE "blog_posts"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_blog_posts" RENAME TO "blog_posts"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_posts" RENAME TO "temporary_blog_posts"`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog_posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "title" varchar NOT NULL, "body" varchar NOT NULL, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "blog_posts"("id", "createdAt", "updatedAt", "title", "body", "userId") SELECT "id", "createdAt", "updatedAt", "title", "body", "userId" FROM "temporary_blog_posts"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_blog_posts"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "blog_posts"`);
  }
}
