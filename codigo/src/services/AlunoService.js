// services/AlunoService.js
import { prisma } from '../prismaClient.js';

class AlunoService {
  async getAllAlunos() {
    return prisma.aluno.findMany({
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
    return prisma.aluno.findUnique({
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
    return prisma.aluno.create({
      data: alunoData,
    });
  }

  async updateAluno(matricula, alunoData) {
    return prisma.aluno.update({
      where: { matricula: Number(matricula) },
      data: alunoData,
    });
  }

  async deleteAluno(matricula) {
    return prisma.aluno.delete({
      where: { matricula: Number(matricula) },
    });
  }
}

export default new AlunoService();
