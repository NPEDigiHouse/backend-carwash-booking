/*
  Warnings:

  - You are about to drop the column `adminId` on the `timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `timeslot` table. All the data in the column will be lost.
  - Added the required column `date` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `timeslot` DROP FOREIGN KEY `Timeslot_adminId_fkey`;

-- AlterTable
ALTER TABLE `timeslot` DROP COLUMN `adminId`,
    DROP COLUMN `day`,
    ADD COLUMN `date` DATETIME(3) NOT NULL;
