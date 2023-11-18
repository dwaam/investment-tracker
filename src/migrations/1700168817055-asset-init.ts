import { MigrationInterface, QueryRunner } from "typeorm";

export class AssetInit1700168817055 implements MigrationInterface {
    name = 'AssetInit1700168817055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "value" numeric NOT NULL, "interest_per_year" numeric NOT NULL DEFAULT '0', "asset_id" uuid NOT NULL, CONSTRAINT "PK_b7feae62265e6f22aa04e64fccb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."asset_type_enum" AS ENUM('SAVING_ACCOUNT', 'CHECKING_ACCOUNT', 'SHARE_SAVINGS_PLAN', 'SHARE_ACCOUNT', 'CRYPTO_CURRENCY')`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account" text NOT NULL, "type" "public"."asset_type_enum" NOT NULL, "user_id" uuid NOT NULL, "asset_id" uuid, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "asset_entry" ADD CONSTRAINT "FK_7c4eb3c36fa7a2c316b5a1ac806" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_2a48e81afa7729ed31c2c7b18ed" FOREIGN KEY ("asset_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_2a48e81afa7729ed31c2c7b18ed"`);
        await queryRunner.query(`ALTER TABLE "asset_entry" DROP CONSTRAINT "FK_7c4eb3c36fa7a2c316b5a1ac806"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TYPE "public"."asset_type_enum"`);
        await queryRunner.query(`DROP TABLE "asset_entry"`);
    }

}
