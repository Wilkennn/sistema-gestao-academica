CREATE DATABESE sis_matricula;
USE sis_matricula;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cel VARCHAR(15),
    email VARCHAR(255),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    endereco TEXT,
    dataNasc DATE
);

CREATE TABLE Curso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numCreditos INT NOT NULL
);

CREATE TABLE Disciplina (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cargaHoraria INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL
);

CREATE TABLE MensalidadeStatus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE Mensalidade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mes INT NOT NULL,
    dataValidade DATE NOT NULL,
    status INT,
    valor DECIMAL(10,2) NOT NULL,
    ano INT NOT NULL,
    FOREIGN KEY (status) REFERENCES MensalidadeStatus(id)
);

CREATE TABLE Aluno (
    matricula INT PRIMARY KEY AUTO_INCREMENT,
    idUser INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User(id)
);

CREATE TABLE Professor (
    idUser INT PRIMARY KEY,
    FOREIGN KEY (idUser) REFERENCES User(id)
);

CREATE TABLE Secretaria (
    idUser INT PRIMARY KEY,
    FOREIGN KEY (idUser) REFERENCES User(id)
);

CREATE TABLE AlunoDisciplina (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idAluno INT NOT NULL,
    idDisciplina INT NOT NULL,
    frequencia INT,
    status VARCHAR(50),
    FOREIGN KEY (idAluno) REFERENCES Aluno(matricula),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(id)
);
