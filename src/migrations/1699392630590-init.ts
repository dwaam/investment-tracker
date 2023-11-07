import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699392630590 implements MigrationInterface {
    name = 'Init1699392630590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."stock_indexes_category_enum" AS ENUM('ENERGY', 'MATERIALS', 'INDUSTRIALS', 'CONSUMER_DISCRETIONARY', 'CONSUMER_STABLES', 'HEALTH_CARE', 'FINANCIALS', 'INFORMATION_TECHNOLOGY', 'TELECOMMUNICATION_SERVICES', 'UTILITIES', 'REAL_ESTATE')`);
        await queryRunner.query(`CREATE TABLE "stock_indexes" ("isin" text NOT NULL, "ticker" character varying NOT NULL, "name" character varying NOT NULL, "currency" character varying NOT NULL, "category" "public"."stock_indexes_category_enum", "country" character varying(2), CONSTRAINT "PK_5ab853edddd57b1affe00b56832" PRIMARY KEY ("isin"))`);
        await queryRunner.query(`CREATE TYPE "public"."stock_transactions_action_enum" AS ENUM('BUY', 'SELL')`);
        await queryRunner.query(`CREATE TABLE "stock_transactions" ("id" BIGSERIAL NOT NULL, "transaction_id" text NOT NULL, "stock_id" text NOT NULL, "date" date NOT NULL, "action" "public"."stock_transactions_action_enum" NOT NULL, "number_of_shares" double precision NOT NULL, "price_per_share" double precision NOT NULL, "exchange_rate" double precision NOT NULL, "total_in_euro" double precision NOT NULL, "currency_conversion_fee" double precision NOT NULL, "index_id" text, CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_25d5deac448160b7580c5a21df" ON "stock_transactions" ("transaction_id") `);
        await queryRunner.query(`CREATE TYPE "public"."stock_dividends_type_enum" AS ENUM('ORDINARY', 'PROPERTY_INCOME', 'BONUS')`);
        await queryRunner.query(`CREATE TYPE "public"."stock_dividends_stock_account_enum" AS ENUM('TRADING_212', 'BOURSE_DIRECT')`);
        await queryRunner.query(`CREATE TABLE "stock_dividends" ("id" BIGSERIAL NOT NULL, "date" date NOT NULL, "stock_id" text NOT NULL, "number_of_shares" double precision NOT NULL, "price_per_share" double precision NOT NULL, "type" "public"."stock_dividends_type_enum" NOT NULL, "total_in_euro" double precision NOT NULL, "withholding_tax" double precision NOT NULL, "stock_account" "public"."stock_dividends_stock_account_enum" NOT NULL, "index_id" text, CONSTRAINT "PK_0bfe6f055e9e3d39eabe5d0f442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country-tax" ("country" character varying NOT NULL, "tax_percentage" double precision NOT NULL, "tax_rate_to_apply" double precision NOT NULL, CONSTRAINT "PK_48dfc64d6f81769c9f0481f7515" PRIMARY KEY ("country"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_39fa92f64e991542e7a44482593" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_b2477240762ca5b999133d758ed" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_b2477240762ca5b999133d758ed"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_39fa92f64e991542e7a44482593"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "country-tax"`);
        await queryRunner.query(`DROP TABLE "stock_dividends"`);
        await queryRunner.query(`DROP TYPE "public"."stock_dividends_stock_account_enum"`);
        await queryRunner.query(`DROP TYPE "public"."stock_dividends_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25d5deac448160b7580c5a21df"`);
        await queryRunner.query(`DROP TABLE "stock_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."stock_transactions_action_enum"`);
        await queryRunner.query(`DROP TABLE "stock_indexes"`);
        await queryRunner.query(`DROP TYPE "public"."stock_indexes_category_enum"`);
    }

}
