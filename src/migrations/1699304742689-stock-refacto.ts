import { MigrationInterface, QueryRunner } from 'typeorm';

export class StockRefacto1699304742689 implements MigrationInterface {
  name = 'StockRefacto1699304742689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "transaction_id" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "stock_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "id" BIGSERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_cd3934a056132635497ef290594"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_8577e157d7b2e9edd9055eaf350" PRIMARY KEY ("date", "number_of_shares", "price_per_share", "index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "stock_id" uuid NOT NULL`);
    await queryRunner.query(
      `CREATE TYPE "public"."stock_dividends_stock_account_enum" AS ENUM('TRADING_212', 'BOURSE_DIRECT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD "stock_account" "public"."stock_dividends_stock_account_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_39fa92f64e991542e7a44482593"`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_b2477240762ca5b999133d758ed"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP CONSTRAINT "FK_4959ce49077b0348b345ac0bf43"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP CONSTRAINT "PK_5ab853edddd57b1affe00b56832"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP COLUMN "isin"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" ADD "isin" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "stock_indexes" ADD CONSTRAINT "PK_5ab853edddd57b1affe00b56832" PRIMARY KEY ("isin")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" ADD "country" character varying(2)`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "id" BIGSERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "stock_transactions" ADD CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "index_id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "index_id" text`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_8577e157d7b2e9edd9055eaf350"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_23bf2f7cb314391059ddb2a9a45" PRIMARY KEY ("number_of_shares", "price_per_share", "index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_23bf2f7cb314391059ddb2a9a45"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_849369c63d87e842381ed2585ce" PRIMARY KEY ("price_per_share", "index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_849369c63d87e842381ed2585ce"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_4ce95e05c8be80c05b4f93ec528" PRIMARY KEY ("index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_4ce95e05c8be80c05b4f93ec528"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_0bfe6f055e9e3d39eabe5d0f442" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "index_id"`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "index_id" text`);
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
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "index_id"`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "index_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_0bfe6f055e9e3d39eabe5d0f442"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_4ce95e05c8be80c05b4f93ec528" PRIMARY KEY ("index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_4ce95e05c8be80c05b4f93ec528"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_849369c63d87e842381ed2585ce" PRIMARY KEY ("price_per_share", "index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_849369c63d87e842381ed2585ce"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_23bf2f7cb314391059ddb2a9a45" PRIMARY KEY ("number_of_shares", "price_per_share", "index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_23bf2f7cb314391059ddb2a9a45"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_8577e157d7b2e9edd9055eaf350" PRIMARY KEY ("date", "number_of_shares", "price_per_share", "index_id", "id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "index_id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "index_id" character varying`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "stock_transactions" ADD CONSTRAINT "PK_1aa2430f5ac950c26da6e1ff222" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" ADD "country" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP CONSTRAINT "PK_5ab853edddd57b1affe00b56832"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" DROP COLUMN "isin"`);
    await queryRunner.query(`ALTER TABLE "stock_indexes" ADD "isin" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "stock_indexes" ADD CONSTRAINT "PK_5ab853edddd57b1affe00b56832" PRIMARY KEY ("isin")`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_indexes" ADD CONSTRAINT "FK_4959ce49077b0348b345ac0bf43" FOREIGN KEY ("country") REFERENCES "country-tax"("country") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_b2477240762ca5b999133d758ed" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_39fa92f64e991542e7a44482593" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "stock_account"`);
    await queryRunner.query(`DROP TYPE "public"."stock_dividends_stock_account_enum"`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "stock_id"`);
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "PK_8577e157d7b2e9edd9055eaf350"`);
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "PK_cd3934a056132635497ef290594" PRIMARY KEY ("date", "number_of_shares", "price_per_share", "index_id")`,
    );
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "stock_id"`);
    await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "transaction_id"`);
  }
}
