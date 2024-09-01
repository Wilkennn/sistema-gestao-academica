import { prismaClient } from '../database/prismaClient.js';
import UsuarioService  from '../services/UsuarioService.js';
import CursoService  from '../services/CursoService.js';
import CursoAlunoService  from '../services/CursoAlunoService.js';

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

      console.log(alunoData) 

      let usuario = await prismaClient.usuario.findUnique({
        where: { email: alunoData.email },
      });

      if (!usuario) {

        const formattedDate = new Date(alunoData.data).toISOString();

        usuario = await UsuarioService.createUsuario({
          nome: alunoData.nome,
          email: alunoData.email,
          cpf: alunoData.cpf,
          endereco: alunoData.endereco,
          telefone: alunoData.telefone,
          dataNascimento: formattedDate,
          login: alunoData.login,
          senha: alunoData.senha,
        });
      }

      const aluno = await prismaClient.aluno.create({
        data: {
          periodo: "1",
          dataIngresso: new Date(),
          usuarioId: usuario.id,
        },
      });

      console.log("Criou o aluno");

      let curso = await prismaClient.curso.findUnique({
        where: { id: parseInt(alunoData.cursoId) },
      })

      if (!curso) {
        console.error("Curso não encontrado");
      } else {
        await prismaClient.curso_Aluno.create({
          data: {
            alunoId: aluno.id,
            cursoId: parseInt(alunoData.cursoId),
            periodo: 1,
            cursoStatus: 'CANCELADO',
          },
        });
      }
      return aluno;

    } catch (error) {
      console.error("Erro ao criar aluno", error);
      return res.status(500).json({
        message: 'Erro ao criar aluno',
        error: error.message || error,
      });
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
