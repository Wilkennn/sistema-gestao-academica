/*
  Warnings:

  - You are about to drop the column `periodo` on the `aluno` table. All the data in the column will be lost.
  - The values [APROVADO,REPROVADO,PENDENTE,CANCELADO] on the enum `Curso_Aluno_cursoStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `aluno` DROP COLUMN `periodo`;

-- AlterTable
ALTER TABLE `curso_aluno` MODIFY `cursoStatus` ENUM('ATIVO', 'FINALIZADO', 'TRANCADO') NOT NULL;
