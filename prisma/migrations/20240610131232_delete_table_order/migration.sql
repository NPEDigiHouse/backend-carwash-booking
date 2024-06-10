/*
  Warnings:

  - You are about to drop the column `orderId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the `_ordertopromo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ordertopromo` DROP FOREIGN KEY `_OrderToPromo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertopromo` DROP FOREIGN KEY `_OrderToPromo_B_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_orderId_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `orderId`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `paymentStatus` ENUM('PENDING', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `receipt` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_ordertopromo`;

-- DropTable
DROP TABLE `order`;

-- CreateTable
CREATE TABLE `_BookingToPromo` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BookingToPromo_AB_unique`(`A`, `B`),
    INDEX `_BookingToPromo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BookingToPromo` ADD CONSTRAINT `_BookingToPromo_A_fkey` FOREIGN KEY (`A`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BookingToPromo` ADD CONSTRAINT `_BookingToPromo_B_fkey` FOREIGN KEY (`B`) REFERENCES `Promo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
