import autoBind from 'auto-bind';
import NotificacaoService from './NotificacaoService.js';
import NotificacaoRepository from './NotificacaoRepository.js';

const notificacaoRepository = new NotificacaoRepository();
const notificacaoService = new NotificacaoService(notificacaoRepository);

export class NotificacaoController {
  constructor() {
    this.notificacaoService = notificacaoService;
    autoBind(this);
  }

  async create(request, response) {
    try {
      const { id, mensagem, data_envio, Aluno_matricula } = request.body;
      const notificacao = await this.notificacaoService.criar({ id, mensagem, data_envio, Aluno_matricula });
      return response.status(201).json({ success: true, message: 'Notificação criada com sucesso', notificacao });
    } catch (error) {
      console.error('Erro ao criar notificação:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getAll(request, response) {
    try {
      const notificacoes = await this.notificacaoService.listarTodos();
      return response.status(200).json(notificacoes);
    } catch (error) {
      console.error('Erro ao listar notificações:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const notificacao = await this.notificacaoService.buscarPorId(id);
      if (!notificacao) {
        return response.status(404).json({ error: 'Notificação não encontrada' });
      }
      return response.status(200).json(notificacao);
    } catch (error) {
      console.error('Erro ao buscar notificação:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { mensagem, data_envio, Aluno_matricula } = request.body;
      const notificacaoAtualizada = await this.notificacaoService.atualizar(id, { mensagem, data_envio, Aluno_matricula });
      return response.status(200).json({ success: true, message: 'Notificação atualizada com sucesso', notificacaoAtualizada });
    } catch (error) {
      console.error('Erro ao atualizar notificação:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      await this.notificacaoService.deletar(id);
      return response.status(200).json({ success: true, message: 'Notificação deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar notificação:', error.message);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
