import autoBind from 'auto-bind';
import { AlunoService } from './AlunoService.js';
import { AlunoRepository } from './AlunoRepository.js';

const alunoRepository = new AlunoRepository();
const alunoService = new AlunoService(alunoRepository);

export class AlunoController {
  constructor() {
    this.alunoService = alunoService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { matricula, periodo, data_ingresso, alunoStatus_id } = request.body;
      const aluno = await this.alunoService.createAluno({ matricula, periodo, data_ingresso, alunoStatus_id });

      return response.status(201).json({ success: true, message: 'Aluno criado com sucesso', aluno });
    } catch (error) {
      console.error('Erro ao criar aluno:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const alunos = await this.alunoService.listarTodos();
      return response.status(200).json(alunos);
    } catch (error) {
      console.error('Erro ao listar alunos:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { matricula } = request.params;
      const aluno = await this.alunoService.buscarPorId(matricula);
      if (!aluno) {
        return response.status(404).json({ error: 'Aluno não encontrado' });
      }
      return response.status(200).json(aluno);
    } catch (error) {
      console.error('Erro ao buscar aluno:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { matricula } = request.params;
      const { periodo, data_ingresso, alunoStatus_id } = request.body;
      const alunoAtualizado = await this.alunoService.atualizar(matricula, { periodo, data_ingresso, alunoStatus_id });
      return response.status(200).json({ success: true, message: 'Aluno atualizado com sucesso', alunoAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { matricula } = request.params;
      await this.alunoService.deletar(matricula);
      return response.status(200).json({ success: true, message: 'Aluno deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar aluno:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
