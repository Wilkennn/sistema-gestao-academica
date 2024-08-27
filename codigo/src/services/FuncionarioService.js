// services/FuncionarioService.js
import { prisma } from '../prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    return prisma.funcionario.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async getFuncionarioById(id) {
    return prisma.funcionario.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: true,
      },
    });
  }

  async createFuncionario(funcionarioData) {
    return prisma.funcionario.create({
      data: funcionarioData,
    });
  }

  async updateFuncionario(id, funcionarioData) {
    return prisma.funcionario.update({
      where: { id: Number(id) },
      data: funcionarioData,
    });
  }

  async deleteFuncionario(id) {
    return prisma.funcionario.delete({
      where: { id: Number(id) },
    });
  }
}

export default new FuncionarioService();
