import { prismaClient } from '../database/prismaClient.js';

class MensalidadeService {
  async getAllMensalidades() {
    return prismaClient.mensalidade.findMany({
      include: {
        aluno: true,
        disciplinas: true,
      },
    });
  }

  async getMensalidadeById(id) {
    return prismaClient.mensalidade.findUnique({
      where: { id: Number(id) },
      include: {
        aluno: true,
        disciplinas: true,
      },
    });
  }

  async createMensalidade(mensalidadeData) {
    return prismaClient.mensalidade.create({
      data: mensalidadeData,
    });
  }

  async updateMensalidade(id, mensalidadeData) {
    return prismaClient.mensalidade.update({
      where: { id: Number(id) },
      data: mensalidadeData,
    });
  }

  async deleteMensalidade(id) {
    return prismaClient.mensalidade.delete({
      where: { id: Number(id) },
    });
  }
}

export default new MensalidadeService();
