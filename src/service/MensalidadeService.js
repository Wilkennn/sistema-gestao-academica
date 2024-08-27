import MensalidadeRepository from '../repository/MensalidadeRepository.js';

export default class MensalidadeService {
  constructor() {
    this.mensalidadeRepository = new MensalidadeRepository();
  }

  listarTodos(callback) {
    return this.mensalidadeRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.mensalidadeRepository.getById(id, callback);
  }

  criar(mensalidade, callback) {
    return this.mensalidadeRepository.create(mensalidade, callback);
  }

  atualizar(id, mensalidade, callback) {
    return this.mensalidadeRepository.update(id, mensalidade, callback);
  }

  deletar(id, callback) {
    return this.mensalidadeRepository.delete(id, callback);
  }
}
