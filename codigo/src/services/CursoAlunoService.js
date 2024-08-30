import { prismaClient } from '../database/prismaClient.js';

class CursoAlunoService {
  async getAllCursoAlunos() {
    try {
      return await prismaClient.curso_Aluno.findMany();
    } catch (error) {
      console.error(error);
      throw new Error('Error ao buscar cursos dos alunos');
    }
  }

  async getCursoAlunoById(cursoId, alunoId) {
    try {
        console.log('Curso ID: ' + cursoId + ' aluno ID: ' + alunoId);
      return await prismaClient.curso_Aluno.findUnique({
        where: { cursoId_alunoId: { 
            cursoId : parseInt(cursoId), 
            alunoId : parseInt(alunoId)} }
      });
    } catch (error) {
        res.status(404).json({
            message: 'Não foi possivel encontrar o curso_aluno. Verifique os dados e tente novamente.',
            error: error.message
          });
    }
  }

  async createCursoAluno(cursoAlunoData) {
    try {
      return await prismaClient.curso_Aluno.create({
        data: cursoAlunoData,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao criar curso do aluno');
    }
  }

  async updateCursoAluno(cursoId, alunoId, cursoAlunoData) {
    try {
      return await prismaClient.curso_Aluno.update({
        where: { cursoId_alunoId: { cursoId, alunoId } },
        data: cursoAlunoData,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao atualizar curso do aluno');
    }
  }

  async deleteCursoAluno(cursoId, alunoId) {
    try {
      return await prismaClient.curso_Aluno.delete({
        where: { cursoId_alunoId: { cursoId, alunoId } },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao deletar curso do aluno');
    }
  }
}

export default new CursoAlunoService();