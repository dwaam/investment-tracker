import { MigrationInterface, QueryRunner } from 'typeorm';

export class dividend1646252970702 implements MigrationInterface {
  name = 'dividend1646252970702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."stock_dividends_type_enum" AS ENUM('ORDINARY', 'PROPERTY_INCOME')`);
    await queryRunner.query(
      `CREATE TABLE "stock_dividends" ("date" date NOT NULL, "type" "public"."stock_dividends_type_enum" NOT NULL, "number_of_shares" double precision NOT NULL, "price_per_share" double precision NOT NULL, "total_in_euro" double precision NOT NULL, "withholding_tax" double precision NOT NULL, "index_id" character varying NOT NULL, CONSTRAINT "PK_cd3934a056132635497ef290594" PRIMARY KEY ("date", "number_of_shares", "price_per_share", "index_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_b2477240762ca5b999133d758ed" FOREIGN KEY ("index_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_b2477240762ca5b999133d758ed"`);
    await queryRunner.query(`DROP TABLE "stock_dividends"`);
    await queryRunner.query(`DROP TYPE "public"."stock_dividends_type_enum"`);
  }
}
