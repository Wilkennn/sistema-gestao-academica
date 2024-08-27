import autoBind from 'auto-bind';
import { AlunoDisciplinaService } from './AlunoDisciplinaService.js';
import { AlunoDisciplinaRepository } from './AlunoDisciplinaRepository.js';

const alunoDisciplinaRepository = new AlunoDisciplinaRepository();
const alunoDisciplinaService = new AlunoDisciplinaService(alunoDisciplinaRepository);

export class AlunoDisciplinaController {
  constructor() {
    this.alunoDisciplinaService = alunoDisciplinaService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { Aluno_matricula, Disciplina_id, nota, frequencia } = request.body;
      const alunoDisciplina = await this.alunoDisciplinaService.createAlunoDisciplina({ Aluno_matricula, Disciplina_id, nota, frequencia });

      return response.status(201).json({ success: true, message: 'Registro de aluno e disciplina criado com sucesso', alunoDisciplina });
    } catch (error) {
      console.error('Erro ao criar registro de aluno e disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const alunoDisciplinas = await this.alunoDisciplinaService.listarTodos();
      return response.status(200).json(alunoDisciplinas);
    } catch (error) {
      console.error('Erro ao listar registros de aluno e disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { Aluno_matricula, Disciplina_id } = request.params;
      const alunoDisciplina = await this.alunoDisciplinaService.buscarPorId(Aluno_matricula, Disciplina_id);
      if (!alunoDisciplina) {
        return response.status(404).json({ error: 'Registro de aluno e disciplina não encontrado' });
      }
      return response.status(200).json(alunoDisciplina);
    } catch (error) {
      console.error('Erro ao buscar registro de aluno e disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { Aluno_matricula, Disciplina_id } = request.params;
      const { nota, frequencia } = request.body;
      const alunoDisciplinaAtualizado = await this.alunoDisciplinaService.atualizar(Aluno_matricula, Disciplina_id, { nota, frequencia });
      return response.status(200).json({ success: true, message: 'Registro de aluno e disciplina atualizado com sucesso', alunoDisciplinaAtualizado });
    } catch (error) {
      console.error('Erro ao atualizar registro de aluno e disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { Aluno_matricula, Disciplina_id } = request.params;
      await this.alunoDisciplinaService.deletar(Aluno_matricula, Disciplina_id);
      return response.status(200).json({ success: true, message: 'Registro de aluno e disciplina deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar registro de aluno e disciplina:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
