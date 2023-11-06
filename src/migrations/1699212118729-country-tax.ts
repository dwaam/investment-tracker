import { MigrationInterface, QueryRunner } from 'typeorm';

export class CountryTax1699212118729 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('IE', 20, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('KY', 25, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('LU', 15, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('IL', 15, 15)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "country-tax"`);
  }
}
