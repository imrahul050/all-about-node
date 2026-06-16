/*
  Warnings:

  - You are about to alter the column `status` on the `blogs` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `blogs` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `status` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT';
