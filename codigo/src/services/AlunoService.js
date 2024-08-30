import { prismaClient } from '../database/prismaClient.js';

class AlunoService {
  async getAllAlunos() {
    try{
     
      return prismaClient.aluno.findMany();
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

  async updateAluno(matricula, alunoData) {
    return prismaClient.aluno.update({
      where: { matricula: Number(matricula) },
      data: alunoData,
    });
  }

  async deleteAluno(matricula) {
    return prismaClient.aluno.delete({
      where: { matricula: Number(matricula) },
    });
  }

}

export default new AlunoService();
