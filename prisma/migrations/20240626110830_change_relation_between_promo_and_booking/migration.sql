-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_promoId_fkey`;

-- AlterTable
ALTER TABLE `booking` MODIFY `promoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_promoId_fkey` FOREIGN KEY (`promoId`) REFERENCES `Promo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
