import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserForTransactions1700324349397 implements MigrationInterface {
    name = 'AddUserForTransactions1700324349397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_d0a2ee13bfd14e500f24a3ef477"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_d82afa5a1a061ad6f9a8f703fc0"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_251e1aacdc10e2e9ad7f63372fc"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_8cb36e9f43373b2388c8a1cf424"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "indexId"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP COLUMN "index_id"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "indexId"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_61e1312854b7526b77d5c838b96" FOREIGN KEY ("stock_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_1c5802229772757c08e3e9c19f8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_4dbf317b2227e136b7faf7aac1d" FOREIGN KEY ("stock_id") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_07476234b775566efbb13338403" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_07476234b775566efbb13338403"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" DROP CONSTRAINT "FK_4dbf317b2227e136b7faf7aac1d"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_1c5802229772757c08e3e9c19f8"`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" DROP CONSTRAINT "FK_61e1312854b7526b77d5c838b96"`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD "indexId" text`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "index_id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD "indexId" text`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_8cb36e9f43373b2388c8a1cf424" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_transactions" ADD CONSTRAINT "FK_251e1aacdc10e2e9ad7f63372fc" FOREIGN KEY ("indexId") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_d82afa5a1a061ad6f9a8f703fc0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_dividends" ADD CONSTRAINT "FK_d0a2ee13bfd14e500f24a3ef477" FOREIGN KEY ("indexId") REFERENCES "stock_indexes"("isin") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
