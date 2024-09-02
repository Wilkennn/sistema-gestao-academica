import { prismaClient } from '../database/prismaClient.js';

class CursoDisciplinaService {
  async addDisciplinaToCurso(cursoId, disciplinaId, periodo) {
    return prismaClient.cursoDisciplina.create({
      data: {
        curso: { connect: { id: cursoId } },
        disciplina: { connect: { id: disciplinaId } },
        periodo: periodo
      }
    });
  }

  async removeDisciplinaFromCurso(cursoId, disciplinaId) {
    return prismaClient.cursoDisciplina.deleteMany({
      where: {
        cursoId,
        disciplinaId,
      },
    });
  }

  async getDisciplinasByCurso(cursoId) {
    return prismaClient.curso.findUnique({
      where: { id: cursoId },
      include: {
        disciplinas: {
          include: {
            disciplina: true,  // Inclui os detalhes completos da disciplina
          },
        },
      },
    });
  }
  

  async getCursosByDisciplina(disciplinaId) {
    return prismaClient.disciplina.findUnique({
      where: { id: disciplinaId },
      include: { cursos: true, disciplina: true},
    });
  }
}

export default new CursoDisciplinaService();
