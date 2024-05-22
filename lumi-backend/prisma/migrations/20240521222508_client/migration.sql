/*
  Warnings:

  - Added the required column `client_numer` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_value` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `invoice_number` on the `invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "client_numer" TEXT NOT NULL,
ADD COLUMN     "total_value" TEXT NOT NULL,
DROP COLUMN "invoice_number",
ADD COLUMN     "invoice_number" INTEGER NOT NULL;
