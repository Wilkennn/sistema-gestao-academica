import { prismaClient } from '../database/prismaClient.js';

class UsuarioService {
  
  async getAllUsuarios() {
    try {
      return await prismaClient.usuario.findMany({
        include: {
          aluno: true,
          funcionarios: true,
        },
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
      throw new Error('Não foi possível buscar os usuários. Tente novamente mais tarde.');
    }
  }

  async getUsuarioById(id) {
    try {
      const usuario = await prismaClient.usuario.findUnique({
        where: { id: Number(id) },
        include: {
          aluno: true,
          funcionarios: true,
        },
      });

      if (!usuario) {
        throw new Error('Usuário não encontrado.');
      }

      return usuario;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error.message);
      throw new Error('Não foi possível encontrar o usuário. Tente novamente mais tarde.');
    }
  }

  async createUsuario(usuarioData) {
    try {
      if (usuarioData.data_nascimento) {
        if (typeof usuarioData.data_nascimento === 'string') {
          usuarioData.data_nascimento = new Date(usuarioData.data_nascimento);
          if (isNaN(usuarioData.data_nascimento.getTime())) {
            throw new Error('Formato de data inválido. Por favor, use o formato ISO 8601.');
          }
        } else if (!(usuarioData.data_nascimento instanceof Date)) {
          throw new Error('Data de nascimento deve ser uma string ou uma instância de Date.');
        }
      }

      return await prismaClient.usuario.create({
        data: usuarioData,
      });

    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Usuário já existe com este identificador.');
      }
      console.error('Erro ao criar usuário:', error.message);
      throw new Error('Não foi possível criar o usuário. Tente novamente mais tarde.');
    }
  }
  
  async updateUsuario(id, usuarioData) {
    try {
      const usuario = await prismaClient.usuario.update({
        where: { id: Number(id) },
        data: usuarioData,
      });

      if (!usuario) {
        throw new Error('Usuário não encontrado para atualização.');
      }

      return usuario;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      throw new Error('Não foi possível atualizar o usuário. Tente novamente mais tarde.');
    }
  }

  async deleteUsuario(id) {
    try {
      const usuario = await prismaClient.usuario.delete({
        where: { id: Number(id) },
      });

      if (!usuario) {
        throw new Error('Usuário não encontrado para exclusão.');
      }

      return usuario;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error.message);
      throw new Error('Não foi possível deletar o usuário. Tente novamente mais tarde.');
    }
  }
}

export default new UsuarioService();
