import { prismaClient } from '../database/prismaClient.js';

class AlunoService {
  async getAllAlunos() {
    try {
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
    } catch (error) {
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

      let usuario = await prismaClient.usuario.findUnique({
        where: { email: alunoData.email },
      });

      if (!usuario) {
        usuario = await UsuarioService.createUsuario({
          nome: alunoData.nome,
          email: alunoData.email,
          cpf: alunoData.cpf,
          endereco: alunoData.endereco,
          telefone: alunoData.telefone,
          dataNascimento: alunoData.dataNascimento,
          login: alunoData.login,
          senha: alunoData.senha,
        });
      }

      const aluno = await prismaClient.aluno.create({
        data: {
          periodo: alunoData.periodo,
          dataIngresso: alunoData.dataIngresso,
          usuarioId: usuario.id,
        },
      });

      return aluno;

      const dataFormatted = alunoData.dataIngresso.split('/').reverse().join('-');
      const dataDate = new Date(dataFormatted);
      alunoData.dataIngresso = dataDate;

      console.log(alunoData.dataIngresso);

      alunoData.periodo = alunoData.periodo.toString();
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
    console.log(id);
    return prismaClient.aluno.delete({

      where: { id: parseInt(id) },
    });
  }

  async addCursoAluno(alunoId, cursoId) {
    try {
      return await prismaClient.curso_Aluno.create({
        data: {
          alunoId: parseInt(alunoId),
          cursoId: parseInt(cursoId),
          periodo: 1,
          cursoStatus: 'CANCELADO'
        },
      });
    } catch (error) {
      console.error('Erro ao adicionar curso ao aluno:', error.message);
      throw new Error('Não foi possível adicionar o curso ao aluno.');
    }
  }
}

export default new AlunoService();
