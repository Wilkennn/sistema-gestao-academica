// services/MensalidadeService.js
import { prisma } from '../prismaClient.js';

class MensalidadeService {
  async getAllMensalidades() {
    return prisma.mensalidade.findMany({
      include: {
        aluno: true,
        disciplinas: true,
      },
    });
  }

  async getMensalidadeById(id) {
    return prisma.mensalidade.findUnique({
      where: { id: Number(id) },
      include: {
        aluno: true,
        disciplinas: true,
      },
    });
  }

  async createMensalidade(mensalidadeData) {
    return prisma.mensalidade.create({
      data: mensalidadeData,
    });
  }

  async updateMensalidade(id, mensalidadeData) {
    return prisma.mensalidade.update({
      where: { id: Number(id) },
      data: mensalidadeData,
    });
  }

  async deleteMensalidade(id) {
    return prisma.mensalidade.delete({
      where: { id: Number(id) },
    });
  }
}

export default new MensalidadeService();
