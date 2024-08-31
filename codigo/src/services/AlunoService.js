import { prismaClient } from '../database/prismaClient.js';

class AlunoService {
  async getAllAlunos() {
    try{
      return await prismaClient.aluno.findMany({
        include: {
          usuario: true,
          cursos: {
            include: {
              curso: true,
            },
          } 
        },
      });
    }catch(error) {
      console.error(error);
      throw new Error('Error ao buscar alunos');
    }
    
  }

  async getAlunoById(id) {
    try {
          return prismaClient.aluno.findUnique({
            where: { id: parseInt(id) },
            include: {
              usuario: true,
              cursos: {
                include: {
                  curso: true,
                },
              },
            },
          });
    } catch (error) {
      console.error(error);
      throw new Error('Error ao buscar aluno');
  }
  }

  async createAluno(alunoData) {
    try {


      const dataFormatted = alunoData.dataIngresso.split('/').reverse().join('-');
      const dataDate = new Date(dataFormatted);
      alunoData.dataIngresso = dataDate;  

      console.log(alunoData.dataIngresso);

      alunoData.periodo  = alunoData.periodo.toString();
          return prismaClient.aluno.create({
            data: alunoData,
          });
    } catch (error) {
        es.status(500).json({ message: 'Error creating student', error });
    }
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
