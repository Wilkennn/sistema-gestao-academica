import autoBind from 'auto-bind';
import { CursoService } from './CursoService.js';
import { CursoRepository } from './CursoRepository.js';

const cursoRepository = new CursoRepository();
const cursoService = new CursoService(cursoRepository);

export class CursoController {
  constructor() {
    this.cursoService = cursoService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { nome, duracao, creditos, carga_horaria } = request.body;
      const curso = await this.cursoService.createCurso({ nome, duracao, creditos, carga_horaria });

      return response.status(201).json({ success: true, message: 'Curso criado com sucesso', curso });
    } catch (error) {
      console.error('Erro ao criar curso:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const cursos = await this.cursoService.listarTodos();
      return response.status(200).json(cursos);
    } catch (error) {
      console.error('Erro ao listar cursos:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const curso = await this.cursoService.buscarPorId(id);
      if (!curso) {
        return response.status(404).json({ error: 'Curso não encontrado' });
      }
      return response.status(200).json(curso);
    } catch (error) {
      console.error('Erro ao buscar curso:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { nome, duracao, creditos, carga_horaria } = request.body;
      const cursoAtualizado = await this.cursoService.atualizar(id, { nome, duracao, creditos, carga_horaria });
      return response.status(200).json({ success: true, message: 'Curso atualizado com sucesso', cursoAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar curso:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await this.cursoService.deletar(id);
      return response.status(200).json({ success: true, message: 'Curso deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar curso:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
