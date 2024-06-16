-- AlterTable
ALTER TABLE `booking` MODIFY `amount` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `profilePicture` VARCHAR(191) NULL;
