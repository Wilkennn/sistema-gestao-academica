import UsuarioRepository from '../repository/UsuarioRepository.js';

export default class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  listarTodos(callback) {
    return this.usuarioRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.usuarioRepository.getById(id, callback);
  }

  criar(usuario, callback) {
    return this.usuarioRepository.create(usuario, callback);
  }

  atualizar(id, usuario, callback) {
    return this.usuarioRepository.update(id, usuario, callback);
  }

  deletar(id, callback) {
    return this.usuarioRepository.delete(id, callback);
  }
}
