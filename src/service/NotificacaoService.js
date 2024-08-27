import NotificacaoRepository from './NotificacaoRepository.js';

export default class NotificacaoService {
  constructor() {
    this.notificacaoRepository = new NotificacaoRepository();
  }

  listarTodos(callback) {
    this.notificacaoRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.notificacaoRepository.getById(id, callback);
  }

  criar(notificacao, callback) {
    this.notificacaoRepository.create(notificacao, callback);
  }

  atualizar(id, notificacao, callback) {
    this.notificacaoRepository.update(id, notificacao, callback);
  }

  deletar(id, callback) {
    this.notificacaoRepository.delete(id, callback);
  }
}
