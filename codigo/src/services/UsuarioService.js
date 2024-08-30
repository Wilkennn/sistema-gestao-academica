import { prismaClient } from '../database/prismaClient.js';

class UsuarioService {
  
  async getAllUsuarios() {
    try {
      return prismaClient.usuario.findMany();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
      throw new Error('Não foi possível buscar os usuários. Tente novamente mais tarde.');
    }
  }

  async getUsuarioById(id) {
    try {
      const usuario = await prismaClient.usuario.findUnique({
        where: { id: parseInt(id) }
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

    if (!usuarioData.dataNascimento || typeof usuarioData.dataNascimento !== 'string') {
      throw new Error('Data de nascimento inválida ou ausente.');
    }
    const dataFormatted = usuarioData.dataNascimento.split('/').reverse().join('-');
    const dataDate = new Date(dataFormatted);
    usuarioData.dataNascimento = dataDate;        
      return await prismaClient.usuario.create({       
        data: usuarioData,
      });
  }
  async updateUsuario(id, usuarioData) {
    try {
      const usuario = await prismaClient.usuario.update({
        where: { id: parseInt(id) },
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
