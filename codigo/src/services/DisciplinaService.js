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
  
      const disciplina = await prismaClient.disciplina.create({
        data: {
          nome: disciplinaData.nome,
          cargaHoraria: disciplinaData.cargaHoraria,
          valor: disciplinaData.valor,
          creditos: disciplinaData.creditos,
          funcionario: {
            connect: {
              id: parseInt(disciplinaData.funcionario)
            }
          }
        }
      });
      return disciplina;
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      throw new Error("Erro ao criar a disciplina.");
    }
  }
  
  async updateDisciplina(id, disciplinaData) {

    disciplinaData.valor = parseFloat(disciplinaData.valor);
    disciplinaData.creditos = parseInt(disciplinaData.creditos);

    return prismaClient.disciplina.update({
      where: { id: parseInt(id) },
      data: {
        nome: disciplinaData.nome,
        cargaHoraria: disciplinaData.cargaHoraria,
        valor: disciplinaData.valor,
        creditos: disciplinaData.creditos,
        funcionario: {
          connect: {
            id: parseInt(disciplinaData.funcionario)
          }
        }
      }
    });
  }

  async deleteDisciplina(id) {
    return prismaClient.disciplina.delete({
      where: { id: Number(id) },
    });
  }

}

export default new DisciplinaService();
