import { MigrationInterface, QueryRunner } from "typeorm";

export class New1699373651171 implements MigrationInterface {
    name = 'New1699373651171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "stock_id"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "stock_id" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "stock_id"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "stock_id" uuid NOT NULL`);
    }

}
