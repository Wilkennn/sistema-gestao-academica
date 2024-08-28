import { prismaClient } from '../database/prismaClient.js';

class AlunoService {
  async getAllAlunos() {
    return prismaClient.aluno.findMany({
      include: {
        alunoStatus: true,
        mensalidades: true,
        notificacoes: true,
        cursos: true,
        disciplinas: true,
        Usuario: true,
      },
    });
  }

  async getAlunoById(matricula) {
    return prismaClient.aluno.findUnique({
      where: { matricula: Number(matricula) },
      include: {
        alunoStatus: true,
        mensalidades: true,
        notificacoes: true,
        cursos: true,
        disciplinas: true,
        Usuario: true,
      },
    });
  }

  async createAluno(alunoData) {
    return prismaClient.aluno.create({
      data: alunoData,
    });
  }

  async updateAluno(matricula, alunoData) {
    return prismaClient.aluno.update({
      where: { matricula: Number(matricula) },
      data: alunoData,
    });
  }

  async deleteAluno(matricula) {
    return prismaClient.aluno.delete({
      where: { matricula: Number(matricula) },
    });
  }

  async createAlunoStatus(alunoStatusData) {
    return prismaClient.alunoStatus.create({
      include: {
        data: alun,
      },
    });
  }
}

export default new AlunoService();
