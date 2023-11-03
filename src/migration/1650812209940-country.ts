import { MigrationInterface, QueryRunner } from 'typeorm';

export class country1650812209940 implements MigrationInterface {
  name = 'Country1650812209940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('FR', 30, 0)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('ES', 21, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('NL', 15, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('BE', 25, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('IT', 25, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('DE', 26.5, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('CH', 35, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('GB', 10, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('US', 15, 15)`);
    await queryRunner.query(`INSERT INTO "country-tax" VALUES ('CA', 15, 15)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
