import NotificacaoRepository from '../repository/NotificacaoRepository.js';

export default class NotificacaoService {
  constructor() {
    this.notificacaoRepository = new NotificacaoRepository();
  }

  listarTodos(callback) {
    return this.notificacaoRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.notificacaoRepository.getById(id, callback);
  }

  criar(notificacao, callback) {
    return this.notificacaoRepository.create(notificacao, callback);
  }

  atualizar(id, notificacao, callback) {
    return this.notificacaoRepository.update(id, notificacao, callback);
  }

  deletar(id, callback) {
    return this.notificacaoRepository.delete(id, callback);
  }
}
