/*
  Warnings:

  - Added the required column `creditos` to the `Disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `disciplina` ADD COLUMN `creditos` INTEGER NOT NULL;
