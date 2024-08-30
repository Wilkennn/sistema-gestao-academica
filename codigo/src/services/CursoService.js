import { prismaClient } from '../database/prismaClient.js';

class CursoService {
  async getAllCursos() {
    return prismaClient.curso.findMany();
  }

  async getCursoById(id) {
    return prismaClient.curso.findUnique({
      where: { id: parseInt(id) },
      include: {
        cursoAluno: true,
      },
    });
  }

  async createCurso(cursoData) {
    return prismaClient.curso.create({
      data: cursoData,
    });
  }

  async updateCurso(id, cursoData) {
    return prismaClient.curso.update({
      where: { id: Number(id) },
      data: cursoData,
    });
  }

  async deleteCurso(id) {
    return prismaClient.curso.delete({
      where: { id: Number(id) },
    });
  }
}

export default new CursoService();
