import { prismaClient } from '../database/prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    try{
      const funcionarios = await prismaClient.funcionario.findMany();
      console.log(funcionarios);
    }catch(err){
      console.error('Erro ao buscar funcionarios:', err.message);
      throw new Error('Não foi possível buscar os funcionarios. Tente novamente mais tarde.');
    }
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
