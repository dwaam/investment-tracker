import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1650815529269 implements MigrationInterface {
  name = 'oops1650815529269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country-tax" ("country" character varying NOT NULL, "tax_percentage" double precision NOT NULL, CONSTRAINT "PK_48dfc64d6f81769c9f0481f7515" PRIMARY KEY ("country"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stock_indexes_category_enum" AS ENUM('ENERGY', 'MATERIALS', 'INDUSTRIALS', 'CONSUMER_DISCRETIONARY', 'CONSUMER_STABLES', 'HEALTH_CARE', 'FINANCIALS', 'INFORMATION_TECHNOLOGY', 'TELECOMMUNICATION_SERVICES', 'UTILITIES', 'REAL_ESTATE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock_indexes" ("isin" character varying NOT NULL, "ticker" character varying NOT NULL, "name" character varying NOT NULL, "currency" character varying NOT NULL, "category" "public"."stock_indexes_category_enum", "country" character varying, CONSTRAINT "PK_5ab853edddd57b1affe00b56832" PRIMARY KEY ("isin"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."stock_transactions_action_enum" AS ENUM('BUY', 'SELL')`);
    await queryRunner.query(
      `CREATE TABLE "stock_transactions" ("id" character varying NOT NULL, "date" date NOT NULL, "action" "public"."stock_transactions_action_enum" NOT NULL, "number_of_shares" double precision NOT NULL, "price_per_share" double precision NOT NULL, "exchange_rate" double precision NOT NULL, "total_in_euro" double precision NOT NULL, "currency_conversion_fee" double precision NOT NULL, "index_id" character varying, CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."stock_dividends_type_enum" AS ENUM('ORDINARY', 'PROPERTY_INCOME', 'BONUS)`);
    await queryRunner.query(
      `CREATE TABLE "stock_dividends" ("date" date NOT NULL, "type" "public"."stock_dividends_type_enum" NOT NULL, "number_of_shares" double precision NOT NULL, "price_per_share" double precision NOT NULL, "total_in_euro" double precision NOT NULL, "withholding_tax" double precision NOT NULL, "index_id" character varying NOT NULL, CONSTRAINT "PK_cd3934a056132635497ef290594" PRIMARY KEY ("date", "number_of_shares", "price_per_share", "index_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_indexes" ADD CONSTRAINT "FK_4959ce49077b0348b345ac0bf43" FOREIGN KEY ("country") REFERENCES "country-tax"("country") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_39fa92f64e991542e7a44482593" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_b2477240762ca5b999133d758ed" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_b2477240762ca5b999133d758ed"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_39fa92f64e991542e7a44482593"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP CONSTRAINT "FK_4959ce49077b0348b345ac0bf43"`);
    await queryRunner.query(`DROP TABLE "stock_dividends"`);
    await queryRunner.query(`DROP TYPE "public"."stock_dividends_type_enum"`);
    await queryRunner.query(`DROP TABLE "stock_transactions"`);
    await queryRunner.query(`DROP TYPE "public"."stock_transactions_action_enum"`);
    await queryRunner.query(`DROP TABLE "stock_indexes"`);
    await queryRunner.query(`DROP TYPE "public"."stock_indexes_category_enum"`);
    await queryRunner.query(`DROP TABLE "country-tax"`);
  }
}
