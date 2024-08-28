import { prismaClient } from '../database/prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    return prismaClient.funcionario.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async getFuncionarioById(id) {
    return prismaClient.funcionario.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: true,
      },
    });
  }

  async createFuncionario(funcionarioData) {
    return prismaClient.funcionario.create({
      data: funcionarioData,
    });
  }

  async updateFuncionario(id, funcionarioData) {
    return prismaClient.funcionario.update({
      where: { id: Number(id) },
      data: funcionarioData,
    });
  }

  async deleteFuncionario(id) {
    return prismaClient.funcionario.delete({
      where: { id: Number(id) },
    });
  }
}

export default new FuncionarioService();
