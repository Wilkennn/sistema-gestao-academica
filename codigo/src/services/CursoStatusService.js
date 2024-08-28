// services/cursoStatusService.js
import { prismaClient } from '../database/prismaClient.js';

class CursoStatusService {
  // Obtém todos os status de curso
  async getAllCursooStatus() {
    return prismaClient.cursoStatus.findMany();
  }

  // Obtém um status de curso por ID
  async getCursoStatusById(id) {
    return prismaClient.cursoStatus.findUnique({
      where: { id: Number(id) },
    });
  }

  // Cria um novo status de curso
  async createCursoStatus(cursoStatusData) {
    return prismaClient.cursoStatus.create({
      data: cursoStatusData,
    });
  }

  // Atualiza um status de curso por ID
  async updateCursoStatus(id, cursoStatusData) {
    return prismaClient.cursoStatus.update({
      where: { id: Number(id) },
      data: cursoStatusData,
    });
  }

  // Deleta um status de curso por ID
  async deletecursoStatus(id) {
    return prismaClient.cursoStatus.delete({
      where: { id: Number(id) },
    });
  }
}

export default new CursoStatusService();
