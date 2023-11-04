import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorUser1699107038823 implements MigrationInterface {
  name = 'RefactorUser1699107038823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_5cb2b3e0419a73a360d327d497f"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    await queryRunner.query(`ALTER TABLE "user" ADD "user_name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "first_name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "last_name" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "username" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "country" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_5cb2b3e0419a73a360d327d497f" PRIMARY KEY ("country")`,
    );
  }
}
