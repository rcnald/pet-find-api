/*
  Warnings:

  - You are about to drop the column `adress_id` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `adress_id` on the `pets` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_adress_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_adress_id_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "adress_id",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adress_id",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
