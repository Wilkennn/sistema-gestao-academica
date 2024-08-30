import { prismaClient } from '../database/prismaClient.js';

class DisciplinaService {
  async getAllDisciplinas() {
    try{
      return prismaClient.disciplina.findMany();
    }catch(error){
      console.error(error);
      throw new Error('Error ao buscar disciplinas');
    }
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
