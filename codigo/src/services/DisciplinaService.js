import { prismaClient } from '../database/prismaClient.js';

class DisciplinaService {
  async getAllDisciplinas() {
    try{
      return prismaClient.disciplina.findMany();
    }catch(error){
      console.error(error);
      throw new Error('Error ao buscar disciplinas');
    }
  }

  async getDisciplinaById(id) {
    return prismaClient.disciplina.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async createDisciplina(disciplinaData) {
    try {
          disciplinaData.valor = parseFloat(disciplinaData.valor);
          disciplinaData.creditos = parseInt(disciplinaData.creditos);
          const disciplina = prismaClient.disciplina.create({
            data: disciplinaData,
          });
          console.log(disciplina)
          return disciplina;
    } catch (error) {
      
    }
  }

  async updateDisciplina(id, disciplinaData) {

    disciplinaData.valor = parseFloat(disciplinaData.valor);
    disciplinaData.creditos = parseInt(disciplinaData.creditos);

    return prismaClient.disciplina.update({
      where: { id: Number(id) },
      data: disciplinaData,
    });
  }

  async deleteDisciplina(id) {
    return prismaClient.disciplina.delete({
      where: { id: Number(id) },
    });
  }

}

export default new DisciplinaService();
