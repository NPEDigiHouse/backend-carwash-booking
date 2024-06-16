/*
  Warnings:

  - You are about to drop the `_bookingtoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_bookingtopromo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[promoId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promoId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_bookingtoproduct` DROP FOREIGN KEY `_BookingToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bookingtoproduct` DROP FOREIGN KEY `_BookingToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_bookingtopromo` DROP FOREIGN KEY `_BookingToPromo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bookingtopromo` DROP FOREIGN KEY `_BookingToPromo_B_fkey`;

-- AlterTable
ALTER TABLE `booking` ADD COLUMN `productId` INTEGER NOT NULL,
    ADD COLUMN `promoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_bookingtoproduct`;

-- DropTable
DROP TABLE `_bookingtopromo`;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_promoId_key` ON `Booking`(`promoId`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_promoId_fkey` FOREIGN KEY (`promoId`) REFERENCES `Promo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
