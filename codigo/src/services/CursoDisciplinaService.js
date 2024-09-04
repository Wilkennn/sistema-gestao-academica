import { prismaClient } from '../database/prismaClient.js';

class CursoDisciplinaService {

  async addDisciplinaToCurso(cursoId, disciplinaId, periodo) {

    try {
      return await prismaClient.cursoDisciplina.create({
        data: {
          curso: { connect: { id: parseInt(cursoId) } },  // Garante que cursoId é um número
          disciplina: { connect: { id: parseInt(disciplinaId) } },  // Garante que disciplinaId é um número
          periodo: parseInt(periodo)
        }
      });
    } catch (error) {
      console.error('Erro ao adicionar disciplina ao curso:', error);
      throw error; // Propaga o erro para que possa ser tratado em outros lugares, se necessário
    }
  }

  async removeDisciplinaFromCurso(cursoId, disciplinaId, periodo) {
    console.log({cursoId, disciplinaId, periodo})
    try {
      return await prismaClient.cursoDisciplina.deleteMany({
        where: {
          cursoId: parseInt(cursoId),
          disciplinaId: parseInt(disciplinaId),
          periodo: parseInt(periodo)
        },
      });
    } catch (error) {
      console.error('Erro ao remover disciplina do curso:', error);
      throw error; // Propaga o erro para que possa ser tratado em outros lugares, se necessário
    }
  }

  async getDisciplinasByCurso(cursoId) {
    try {
      return await prismaClient.curso.findUnique({
        where: { id: cursoId },
        include: {
          disciplinas: {
            include: {
              disciplina: true,  // Inclui os detalhes completos da disciplina
            },
          },
        },
      });
    } catch (error) {
      console.error('Erro ao obter disciplinas do curso:', error);
      throw error; // Propaga o erro para que possa ser tratado em outros lugares, se necessário
    }
  }
  
}

export default new CursoDisciplinaService();
