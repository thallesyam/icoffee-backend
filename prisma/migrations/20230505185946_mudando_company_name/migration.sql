/*
  Warnings:

  - Added the required column `checkoutId` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "checkoutId" TEXT NOT NULL;
