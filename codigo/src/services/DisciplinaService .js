import { prismaClient } from '../database/prismaClient.js';

class DisciplinaService {
  async getAllDisciplinas() {
    return prismaClient.disciplina.findMany({
      include: {
        alunos: true,
        mensalidades: true,
      },
    });
  }

  async getDisciplinaById(id) {
    return prismaClient.disciplina.findUnique({
      where: { id: Number(id) },
      include: {
        alunos: true,
        mensalidades: true,
      },
    });
  }

  async createDisciplina(disciplinaData) {
    return prismaClient.disciplina.create({
      data: disciplinaData,
    });
  }

  async updateDisciplina(id, disciplinaData) {
    return prismaClient.disciplina.update({
      where: { id: Number(id) },
      data: disciplinaData,
    });
  }

  async deleteDisciplina(id) {
    return prismaClient.disciplina.delete({
      where: { id: Number(id) },
    });
  }
}

export default new DisciplinaService();
