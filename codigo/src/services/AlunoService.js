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
      console.log(alunoData);
  
      // Verifica se o usuário já existe com base no e-mail
      let usuario = await prismaClient.usuario.findUnique({
        where: { email: alunoData.email },
      });
  
      // Se o usuário não existir, cria um novo
      if (!usuario) {
        const formattedDate = new Date(alunoData.dataNascimento).toISOString();
  
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
  
      // Cria um novo aluno associado ao usuário
      const aluno = await prismaClient.aluno.create({
        data: {
          dataIngresso: new Date(),
          usuarioId: usuario.id,
        },
      });
  
      console.log("Criou o aluno");
  
      // Associa o aluno aos cursos
      if (Array.isArray(alunoData.cursoIds)) {
        for (let cursoId of alunoData.cursoIds) {
          await prismaClient.curso_Aluno.create({
            data: {
              alunoId: aluno.id,
              cursoId: parseInt(cursoId),
              periodo: 1,
              cursoStatus: 'ATIVO',
            },
          });
        }
      } else if (alunoData.cursoId) {
        await prismaClient.curso_Aluno.create({
          data: {
            alunoId: aluno.id,
            cursoId: parseInt(alunoData.cursoId),
            periodo: 1,
            cursoStatus: 'ATIVO',
          },
        });
      }
  
      // Retorna o objeto do aluno criado, incluindo a ID
      return aluno;
  
    } catch (error) {
      console.error("Erro ao criar aluno", error);
      throw new Error('Erro ao criar aluno: ' + error.message);
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
          cursoStatus: 'ATIVO'
        },
      });
    } catch (error) {
      console.error('Erro ao adicionar curso ao aluno:', error.message);
      throw new Error('Não foi possível adicionar o curso ao aluno.');
    }
  }
}

export default new AlunoService();
