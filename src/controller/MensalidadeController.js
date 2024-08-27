import autoBind from 'auto-bind';
import { MensalidadeService } from './MensalidadeService.js';
import { MensalidadeRepository } from './MensalidadeRepository.js';

const mensalidadeRepository = new MensalidadeRepository();
const mensalidadeService = new MensalidadeService(mensalidadeRepository);

export class MensalidadeController {
  constructor() {
    this.mensalidadeService = mensalidadeService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { mes, ano, data_validade, valor, aluno_matricula } = request.body;
      const mensalidade = await this.mensalidadeService.createMensalidade({ mes, ano, data_validade, valor, aluno_matricula });

      return response.status(201).json({ success: true, message: 'Mensalidade criada com sucesso', mensalidade });
    } catch (error) {
      console.error('Erro ao criar mensalidade:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const mensalidades = await this.mensalidadeService.listarTodos();
      return response.status(200).json(mensalidades);
    } catch (error) {
      console.error('Erro ao listar mensalidades:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const mensalidade = await this.mensalidadeService.buscarPorId(id);
      if (!mensalidade) {
        return response.status(404).json({ error: 'Mensalidade não encontrada' });
      }
      return response.status(200).json(mensalidade);
    } catch (error) {
      console.error('Erro ao buscar mensalidade:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { mes, ano, data_validade, valor, aluno_matricula } = request.body;
      const mensalidadeAtualizada = await this.mensalidadeService.atualizar(id, { mes, ano, data_validade, valor, aluno_matricula });
      return response.status(200).json({ success: true, message: 'Mensalidade atualizada com sucesso', mensalidadeAtualizada });
    } catch (error) {
      console.error('Erro ao atualizar mensalidade:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await this.mensalidadeService.deletar(id);
      return response.status(200).json({ success: true, message: 'Mensalidade deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar mensalidade:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
