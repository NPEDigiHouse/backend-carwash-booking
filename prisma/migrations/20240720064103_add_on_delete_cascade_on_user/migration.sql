-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_customerId_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
