import { MigrationInterface, QueryRunner } from 'typeorm';

export class stockIndex1646244483287 implements MigrationInterface {
  name = 'stockIndex1646244483287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock_indexes" ("isin" character varying NOT NULL, "ticker" character varying NOT NULL, "name" character varying NOT NULL, "currency" character varying NOT NULL, "category" "public"."stock_indexes_category_enum", CONSTRAINT "PK_5ab853edddd57b1affe00b56832" PRIMARY KEY ("isin"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stock_indexes"`);
  }
}
