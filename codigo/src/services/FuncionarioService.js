import { prismaClient } from '../database/prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    try{
      return await prismaClient.funcionario.findMany();
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
        cargos: {
          include: {
            cargo: true,
          },
        },
      },
    });
  }

  async createFuncionario(funcionarioData) {
    return await prismaClient.funcionario.create({
      data: {
        salario: funcionarioData.salario,
        dataAdmissao: new Date(funcionarioData.dataAdmissao),
        usuarioId: funcionarioData.usuarioId,
        cargos: {
          create: funcionarioData.cargos.map(cargo => ({
            cargo: { connect: { id: cargo.cargoId } }
          }))
        }
      }
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
