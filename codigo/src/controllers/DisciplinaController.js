// services/DisciplinaService.js
import { prisma } from '../prismaClient.js';

class DisciplinaService {
  async getAllDisciplinas() {
    return prisma.disciplina.findMany({
      include: {
        alunos: true,
        mensalidades: true,
      },
    });
  }

  async getDisciplinaById(id) {
    return prisma.disciplina.findUnique({
      where: { id: Number(id) },
      include: {
        alunos: true,
        mensalidades: true,
      },
    });
  }

  async createDisciplina(disciplinaData) {
    return prisma.disciplina.create({
      data: disciplinaData,
    });
  }

  async updateDisciplina(id, disciplinaData) {
    return prisma.disciplina.update({
      where: { id: Number(id) },
      data: disciplinaData,
    });
  }

  async deleteDisciplina(id) {
    return prisma.disciplina.delete({
      where: { id: Number(id) },
    });
  }
}

export default new DisciplinaService();
