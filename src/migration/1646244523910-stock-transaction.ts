import { MigrationInterface, QueryRunner } from 'typeorm';

export class stockTransaction1646244523910 implements MigrationInterface {
  name = 'stockTransaction1646244523910';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock_indexes" ("isin" character varying NOT NULL, "ticker" character varying NOT NULL, "name" character varying NOT NULL, "currency" character varying NOT NULL, "category" "public"."stock_indexes_category_enum", CONSTRAINT "PK_5ab853edddd57b1affe00b56832" PRIMARY KEY ("isin"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock_transactions" ("id" character varying NOT NULL, "date" date NOT NULL, "action" "public"."stock_transactions_action_enum" NOT NULL, "number_of_shares" double precision NOT NULL, "price_per_share" double precision NOT NULL, "exchange_rate" double precision NOT NULL, "total_in_euro" double precision NOT NULL, "currency_conversion_fee" double precision NOT NULL, "index_id" character varying, CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_39fa92f64e991542e7a44482593" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_39fa92f64e991542e7a44482593"`);
    await queryRunner.query(`DROP TABLE "stock_transactions"`);
    await queryRunner.query(`DROP TABLE "stock_indexes"`);
  }
}
