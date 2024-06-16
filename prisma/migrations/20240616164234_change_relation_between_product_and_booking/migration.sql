/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Booking_productId_key` ON `Booking`(`productId`);
