import { prismaClient } from '../database/prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    return prismaClient.funcionarios.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async getFuncionarioById(id) {
    return prismaClient.funcionarios.findUnique({
      where: { id: Number(id) },
      include: {
        usuario: true,
      },
    });
  }

  async createFuncionario(funcionarioData) {
    return prismaClient.funcionarios.create({
      data: funcionarioData,
    });
  }

  async updateFuncionario(id, funcionarioData) {
    return prismaClient.funcionarios.update({
      where: { id: Number(id) },
      data: funcionarioData,
    });
  }

  async deleteFuncionario(id) {
    return prismaClient.funcionarios.delete({
      where: { id: Number(id) },
    });
  }
}

export default new FuncionarioService();
