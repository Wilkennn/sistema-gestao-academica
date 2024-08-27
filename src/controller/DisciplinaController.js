import autoBind from 'auto-bind';
import { DisciplinaService } from './DisciplinaService.js';
import { DisciplinaRepository } from './DisciplinaRepository.js';

const disciplinaRepository = new DisciplinaRepository();
const disciplinaService = new DisciplinaService(disciplinaRepository);

export class DisciplinaController {
  constructor() {
    this.disciplinaService = disciplinaService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { nome, carga_horaria, valor } = request.body;
      const disciplina = await this.disciplinaService.createDisciplina({ nome, carga_horaria, valor });

      return response.status(201).json({ success: true, message: 'Disciplina criada com sucesso', disciplina });
    } catch (error) {
      console.error('Erro ao criar disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const disciplinas = await this.disciplinaService.listarTodos();
      return response.status(200).json(disciplinas);
    } catch (error) {
      console.error('Erro ao listar disciplinas:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const disciplina = await this.disciplinaService.buscarPorId(id);
      if (!disciplina) {
        return response.status(404).json({ error: 'Disciplina não encontrada' });
      }
      return response.status(200).json(disciplina);
    } catch (error) {
      console.error('Erro ao buscar disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { nome, carga_horaria, valor } = request.body;
      const disciplinaAtualizada = await this.disciplinaService.atualizar(id, { nome, carga_horaria, valor });
      return response.status(200).json({ success: true, message: 'Disciplina atualizada com sucesso', disciplinaAtualizada });
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await this.disciplinaService.deletar(id);
      return response.status(200).json({ success: true, message: 'Disciplina deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
