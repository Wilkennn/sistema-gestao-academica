import { prismaClient } from '../database/prismaClient.js';

class CursoDisciplinaService {
  async addDisciplinaToCurso(cursoId, disciplinaId) {
    return prismaClient.cursoDisciplina.create({
      data: {
        curso: { connect: { id: cursoId } },
        disciplina: { connect: { id: disciplinaId } },
      },
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
      include: { disciplinas: true },
    });
  }

  async getCursosByDisciplina(disciplinaId) {
    return prismaClient.disciplina.findUnique({
      where: { id: disciplinaId },
      include: { cursos: true },
    });
  }
}

export default new CursoDisciplinaService();
