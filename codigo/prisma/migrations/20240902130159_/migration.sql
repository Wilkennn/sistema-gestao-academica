/*
  Warnings:

  - Added the required column `periodo` to the `CursoDisciplina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursodisciplina` ADD COLUMN `periodo` INTEGER NOT NULL;
