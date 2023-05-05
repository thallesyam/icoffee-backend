/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `checkoutId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId",
ADD COLUMN     "checkoutId" TEXT NOT NULL,
ADD COLUMN     "clientEmail" TEXT NOT NULL,
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
