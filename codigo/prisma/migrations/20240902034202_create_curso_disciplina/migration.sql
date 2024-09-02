-- CreateTable
CREATE TABLE `CursoDisciplina` (
    `cursoId` INTEGER NOT NULL,
    `disciplinaId` INTEGER NOT NULL,

    PRIMARY KEY (`cursoId`, `disciplinaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CursoDisciplina` ADD CONSTRAINT `CursoDisciplina_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoDisciplina` ADD CONSTRAINT `CursoDisciplina_disciplinaId_fkey` FOREIGN KEY (`disciplinaId`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
