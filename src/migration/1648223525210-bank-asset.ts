import { MigrationInterface, QueryRunner } from 'typeorm';

export class bankAsset1648223525210 implements MigrationInterface {
  name = 'bankAsset1648223525210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bank-asset" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."bank-asset_type_enum" AS ENUM('CHECKING_ACCOUNT', 'SAVING_ACCOUNT')`,
    );
    await queryRunner.query(`ALTER TABLE "bank-asset" ADD "type" "public"."bank-asset_type_enum" NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bank-asset" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."bank-asset_type_enum"`);
    await queryRunner.query(`ALTER TABLE "bank-asset" ADD "type" character varying NOT NULL`);
  }
}
