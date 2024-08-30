import { prismaClient } from '../database/prismaClient.js';

class AlunoService {
  async getAllAlunos() {
    try{
      return await prismaClient.aluno.findMany();
    }catch(error) {
      console.error(error);
      throw new Error('Error ao buscar alunos');
    }
    
  }

  async getAlunoById(id) {
    try {
          return prismaClient.aluno.findUnique({
            where: { id: parseInt(id) }
          });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao buscar aluno');
  }
  }

  async createAluno(alunoData) {
    return prismaClient.aluno.create({
      data: alunoData,
    });
  }

  async updateAluno(id, alunoData) {
    try {
          return prismaClient.aluno.update({
            where: { id: parseInt(id) },
            data: alunoData,
          });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao atualizar aluno');
    }
  }

  async deleteAluno(id) {
    return prismaClient.aluno.delete({
      where: { id: parseInt(id) },
    });
  }
}

export default new AlunoService();
