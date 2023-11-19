import { MigrationInterface, QueryRunner } from "typeorm";

export class AssAssetInfo1700314978569 implements MigrationInterface {
    name = 'AssAssetInfo1700314978569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."asset_company_enum" AS ENUM('CREDIT_AGRICOLE', 'BOURSORAMA', 'REVOLUT', 'TRADING_212', 'BOURSE_DIRECT', 'TRADE_REPUBLIC', 'LEDGER', 'BINANCE', 'COINBASE', 'ABEILLE_ASSURANCE', 'YOMONI')`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "company" "public"."asset_company_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "asset" ADD "maximum_value" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "maximum_value"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "company"`);
        await queryRunner.query(`DROP TYPE "public"."asset_company_enum"`);
    }

}
