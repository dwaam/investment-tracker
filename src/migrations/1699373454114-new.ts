import { MigrationInterface, QueryRunner } from "typeorm";

export class New1699373454114 implements MigrationInterface {
    name = 'New1699373454114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_25d5deac448160b7580c5a21df" ON "stock_transactions" ("transaction_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_25d5deac448160b7580c5a21df"`);
    }

}
