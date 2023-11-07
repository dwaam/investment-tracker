import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTransaction1699373287502 implements MigrationInterface {
  name = 'FixTransaction1699373287502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "stock_id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "stock_id" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "stock_id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "stock_id" uuid NOT NULL`);
  }
}
