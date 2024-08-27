// services/UsuarioService.js
import { prisma } from '../prismaClient.js';

class UsuarioService {
  async getAllUsuarios() {
    return prisma.usuario.findMany({
      include: {
        aluno: true,
        funcionarios: true,
      },
    });
  }

  async getUsuarioById(id) {
    return prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        aluno: true,
        funcionarios: true,
      },
    });
  }

  async createUsuario(usuarioData) {
    return prisma.usuario.create({
      data: usuarioData,
    });
  }

  async updateUsuario(id, usuarioData) {
    return prisma.usuario.update({
      where: { id: Number(id) },
      data: usuarioData,
    });
  }

  async deleteUsuario(id) {
    return prisma.usuario.delete({
      where: { id: Number(id) },
    });
  }
}

export default new UsuarioService();
