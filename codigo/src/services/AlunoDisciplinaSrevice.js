import { prismaClient } from '../database/prismaClient.js';

class AlunoDisciplinaService {
  async getAllAlunoDisciplinas() {
    try {
      return await prismaClient.aluno_Disciplina.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Error ao buscar disciplinas dos alunos');
    }
  }

  async getAlunoDisciplinaById(alunoId, disciplinaId) {
    try {
      return await prismaClient.aluno_Disciplina.findUnique({
        where: { alunoId_disciplinaId: { alunoId, disciplinaId } }
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao buscar disciplina do aluno');
    }
  }

  async createAlunoDisciplina(alunoDisciplinaData) {
    try {
      return await prismaClient.aluno_Disciplina.create({
        data: alunoDisciplinaData,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao criar disciplina do aluno');
    }
  }

  async updateAlunoDisciplina(alunoId, disciplinaId, alunoDisciplinaData) {
    try {
      return await prismaClient.aluno_Disciplina.update({
        where: { alunoId_disciplinaId: { alunoId, disciplinaId } },
        data: alunoDisciplinaData,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao atualizar disciplina do aluno');
    }
  }

  async deleteAlunoDisciplina(alunoId, disciplinaId) {
    try {
      return await prismaClient.aluno_Disciplina.delete({
        where: { alunoId_disciplinaId: { alunoId, disciplinaId } },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao deletar disciplina do aluno');
    }
  }
}

export default new AlunoDisciplinaService();
