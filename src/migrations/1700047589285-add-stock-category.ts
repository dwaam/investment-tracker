import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockCategory1700047589285 implements MigrationInterface {
    name = 'AddStockCategory1700047589285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."stock_indexes_category_enum" RENAME TO "stock_indexes_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."stock_indexes_category_enum" AS ENUM('ENERGY', 'MATERIALS', 'INDUSTRIALS', 'CONSUMER_DISCRETIONARY', 'CONSUMER_STABLES', 'HEALTH_CARE', 'FINANCIALS', 'INFORMATION_TECHNOLOGY', 'TELECOMMUNICATION_SERVICES', 'UTILITIES', 'REAL_ESTATE', 'GLOBAL_ETF')`);
        await queryRunner.query(`ALTER TABLE "stock_indexes" ALTER COLUMN "category" TYPE "public"."stock_indexes_category_enum" USING "category"::"text"::"public"."stock_indexes_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."stock_indexes_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."stock_indexes_category_enum_old" AS ENUM('ENERGY', 'MATERIALS', 'INDUSTRIALS', 'CONSUMER_DISCRETIONARY', 'CONSUMER_STABLES', 'HEALTH_CARE', 'FINANCIALS', 'INFORMATION_TECHNOLOGY', 'TELECOMMUNICATION_SERVICES', 'UTILITIES', 'REAL_ESTATE')`);
        await queryRunner.query(`ALTER TABLE "stock_indexes" ALTER COLUMN "category" TYPE "public"."stock_indexes_category_enum_old" USING "category"::"text"::"public"."stock_indexes_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."stock_indexes_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."stock_indexes_category_enum_old" RENAME TO "stock_indexes_category_enum"`);
    }

}
