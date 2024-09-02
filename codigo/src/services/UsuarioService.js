import { prismaClient } from '../database/prismaClient.js';

class UsuarioService {
  async getAllUsuarios() {
    try {
      return await prismaClient.usuario.findMany();
    } catch (err) {
      console.error('Erro ao buscar usuários:', err.message);
      throw new Error('Não foi possível buscar os usuários. Tente novamente mais tarde.');
    }
  }

  async getUsuarioById(id) {
    try {
      return await prismaClient.usuario.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      console.error('Erro ao buscar usuário:', err.message);
      throw new Error('Não foi possível buscar o usuário. Tente novamente mais tarde.');
    }
  }

  async createUsuario(usuarioData) {
    try {

      const formattedDate = new Date(usuarioData.dataNascimento).toISOString();
  
      const usuarioCriado = await prismaClient.usuario.create({
        data: {
          ...usuarioData,
          dataNascimento: formattedDate,
        },
      });
  
      return usuarioCriado;
  
    } catch (err) {
      console.error('Erro ao criar usuário:', err.message);
      throw new Error('Não foi possível criar o usuário. Tente novamente mais tarde.');
    }
  }
  
  async updateUsuario(id, usuarioData) {
    const dataNascimento = new Date(usuarioData.dataNascimento).toISOString();
    
    try {
      return await prismaClient.usuario.update({
        where: { id: parseInt(id) },
        data: {
          ...usuarioData,
          dataNascimento: dataNascimento,
        },
      });
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err.message);
      throw new Error('Não foi possível atualizar o usuário. Tente novamente mais tarde.');
    }
  }

  async deleteUsuario(id) {
    try {
      return await prismaClient.usuario.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      console.error('Erro ao deletar usuário:', err.message);
      throw new Error('Não foi possível deletar o usuário. Tente novamente mais tarde.');
    }
  }
}

export default new UsuarioService();
