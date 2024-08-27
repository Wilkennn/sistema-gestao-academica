import MensalidadeRepository from './MensalidadeRepository.js';

export default class MensalidadeService {
  constructor() {
    this.mensalidadeRepository = new MensalidadeRepository();
  }

  listarTodos(callback) {
    this.mensalidadeRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.mensalidadeRepository.getById(id, callback);
  }

  criar(mensalidade, callback) {
    this.mensalidadeRepository.create(mensalidade, callback);
  }

  atualizar(id, mensalidade, callback) {
    this.mensalidadeRepository.update(id, mensalidade, callback);
  }

  deletar(id, callback) {
    this.mensalidadeRepository.delete(id, callback);
  }
}
