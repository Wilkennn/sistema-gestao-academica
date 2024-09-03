import { prismaClient } from '../database/prismaClient.js';

class FuncionarioService {
  async getAllFuncionarios() {
    try {
      return await prismaClient.funcionario.findMany({
        include: {
          usuario: true,
        }
      });
    } catch (err) {
      console.error('Erro ao buscar funcionários:', err.message);
      throw new Error('Não foi possível buscar os funcionários. Tente novamente mais tarde.');
    }
  }

  async getFuncionarioById(id) {
    try {
      return await prismaClient.funcionario.findUnique({
        where: { id: parseInt(id) },
        include: {
          usuario: true,
          cursos: true,
        },
      });
    } catch (err) {
      console.error('Erro ao buscar funcionário:', err.message);
      throw new Error('Não foi possível buscar o funcionário. Tente novamente mais tarde.');
    }
  }

  async createFuncionario(funcionarioData) {
    try {
      const dataAdmissao = new Date(funcionarioData.dataAdmissao).toISOString();

      const funcionario = await prismaClient.funcionario.create({
        data: {
          salario: parseFloat(funcionarioData.salario),
          dataAdmissao: dataAdmissao,
          usuarioId: funcionarioData.usuarioId,
          cargo: funcionarioData.cargo,
        }
      });

      return funcionario;
    } catch (err) {
      console.error('Erro ao criar funcionário:', err.message);
      throw new Error('Não foi possível criar o funcionário. Tente novamente mais tarde.');
    }
  }

  async updateFuncionario(id, funcionarioData) {

    const dataAdmissao = new Date(funcionarioData.dataAdmissao).toISOString();

    try {
        return await prismaClient.funcionario.update({
            where: { id: parseInt(id, 10) },
            data: {
                salario: parseFloat(funcionarioData.salario),
                dataAdmissao: dataAdmissao,
                usuarioId: funcionarioData.usuarioId,
                cargo: funcionarioData.cargo,
            },
        });
    } catch (err) {
        console.error('Erro ao atualizar funcionário:', err.message);
        throw new Error('Não foi possível atualizar o funcionário. Tente novamente mais tarde.');
    }
  }

  async deleteFuncionario(id) {
    try {
      return await prismaClient.funcionario.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      console.error('Erro ao deletar funcionário:', err.message);
      throw new Error('Não foi possível deletar o funcionário. Tente novamente mais tarde.');
    }
  }
}

export default new FuncionarioService();
