-- CreateTable
CREATE TABLE `CursoStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno` (
    `matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `periodo` VARCHAR(191) NOT NULL,
    `data_ingresso` DATETIME(3) NOT NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `alunoMatricula` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `duracao` INTEGER NOT NULL,
    `creditos` INTEGER NOT NULL,
    `carga_horaria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `carga_horaria` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensalidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mes` VARCHAR(191) NOT NULL,
    `ano` VARCHAR(191) NOT NULL,
    `data_validade` DATETIME(3) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `alunoMatricula` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MensalidadeStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `mensalidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` VARCHAR(191) NOT NULL,
    `alunoMatricula` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salario` DOUBLE NOT NULL,
    `data_admissao` DATETIME(3) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Funcionarios_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `funcionariosId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTableQ
CREATE TABLE `Curso_Aluno` (
    `cursoId` INTEGER NOT NULL,
    `alunoMatricula` INTEGER NOT NULL,
    `periodo` INTEGER NOT NULL,
    `aproveitamento` DOUBLE NULL,
    'cursoStatusId' INTEGER NOT NULL,

    PRIMARY KEY (`cursoId`, `alunoMatricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno_Disciplina` (
    `alunoMatricula` INTEGER NOT NULL,
    `disciplinaId` INTEGER NOT NULL,
    `nota` DOUBLE NOT NULL,
    `frequencia` DOUBLE NOT NULL,

    PRIMARY KEY (`alunoMatricula`, `disciplinaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensalidade_Disciplina` (
    `mensalidadeId` INTEGER NOT NULL,
    `disciplinaId` INTEGER NOT NULL,

    PRIMARY KEY (`mensalidadeId`, `disciplinaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_alunoStatusId_fkey` FOREIGN KEY (`alunoStatusId`) REFERENCES `AlunoStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_alunoMatricula_fkey` FOREIGN KEY (`alunoMatricula`) REFERENCES `Aluno`(`matricula`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensalidade` ADD CONSTRAINT `Mensalidade_alunoMatricula_fkey` FOREIGN KEY (`alunoMatricula`) REFERENCES `Aluno`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MensalidadeStatus` ADD CONSTRAINT `MensalidadeStatus_mensalidadeId_fkey` FOREIGN KEY (`mensalidadeId`) REFERENCES `Mensalidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_alunoMatricula_fkey` FOREIGN KEY (`alunoMatricula`) REFERENCES `Aluno`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Funcionarios` ADD CONSTRAINT `Funcionarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cargo` ADD CONSTRAINT `Cargo_funcionariosId_fkey` FOREIGN KEY (`funcionariosId`) REFERENCES `Funcionarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso_Aluno` ADD CONSTRAINT `Curso_Aluno_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso_Aluno` ADD CONSTRAINT `Curso_Aluno_alunoMatricula_fkey` FOREIGN KEY (`alunoMatricula`) REFERENCES `Aluno`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno_Disciplina` ADD CONSTRAINT `Aluno_Disciplina_alunoMatricula_fkey` FOREIGN KEY (`alunoMatricula`) REFERENCES `Aluno`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno_Disciplina` ADD CONSTRAINT `Aluno_Disciplina_disciplinaId_fkey` FOREIGN KEY (`disciplinaId`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensalidade_Disciplina` ADD CONSTRAINT `Mensalidade_Disciplina_mensalidadeId_fkey` FOREIGN KEY (`mensalidadeId`) REFERENCES `Mensalidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensalidade_Disciplina` ADD CONSTRAINT `Mensalidade_Disciplina_disciplinaId_fkey` FOREIGN KEY (`disciplinaId`) REFERENCES `Disciplina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
