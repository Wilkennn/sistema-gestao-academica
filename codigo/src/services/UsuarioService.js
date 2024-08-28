import { prismaClient } from '../database/prismaClient.js';

class UsuarioService {
  async getAllUsuarios() {
    return prismaClient.usuario.findMany({
      include: {
        aluno: true,
        funcionarios: true,
      },
    });
  }

  async getUsuarioById(id) {
    return prismaClient.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        aluno: true,
        funcionarios: true,
      },
    });
  }

  async createUsuario(usuarioData) {
    if (typeof usuarioData.data_nascimento === 'string') {
      try {
        usuarioData.data_nascimento = new Date(usuarioData.data_nascimento);
        if (isNaN(usuarioData.data_nascimento.getTime())) {
          throw new Error('Data de nascimento inválida.');
        }
      } catch (error) {
        throw new Error('Formato de data inválido. Por favor, use o formato ISO 8601.');
      }
    } else if (!(usuarioData.data_nascimento instanceof Date)) {
      throw new Error('Data de nascimento deve ser uma string ou uma instância de Date.');
    }

    try {
      const newUsuario = await prismaClient.usuario.create({
        data: usuarioData,
      });
      return newUsuario;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Usuário já existe com este identificador.');
      }
      console.error('Erro ao criar usuário:', error.message);
      throw new Error('Não foi possível criar o usuário. Tente novamente mais tarde.');
    }
  }
  
  async updateUsuario(id, usuarioData) {
    return prismaClient.usuario.update({
      where: { id: Number(id) },
      data: usuarioData,
    });
  }

  async deleteUsuario(id) {
    return prismaClient.usuario.delete({
      where: { id: Number(id) },
    });
  }
}

export default new UsuarioService();
