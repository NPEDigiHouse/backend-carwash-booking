/*
  Warnings:

  - You are about to drop the column `productId` on the `booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_productId_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `_BookingToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookingToProduct_AB_unique`(`A`, `B`),
    INDEX `_BookingToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookingToProduct` ADD CONSTRAINT `_BookingToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookingToProduct` ADD CONSTRAINT `_BookingToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
