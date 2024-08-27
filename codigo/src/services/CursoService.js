// services/CursoService.js
import { prisma } from '../prismaClient.js';

class CursoService {
  async getAllCursos() {
    return prisma.curso.findMany({
      include: {
        alunos: true,
      },
    });
  }

  async getCursoById(id) {
    return prisma.curso.findUnique({
      where: { id: Number(id) },
      include: {
        alunos: true,
      },
    });
  }

  async createCurso(cursoData) {
    return prisma.curso.create({
      data: cursoData,
    });
  }

  async updateCurso(id, cursoData) {
    return prisma.curso.update({
      where: { id: Number(id) },
      data: cursoData,
    });
  }

  async deleteCurso(id) {
    return prisma.curso.delete({
      where: { id: Number(id) },
    });
  }
}

export default new CursoService();
