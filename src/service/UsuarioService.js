import UsuarioRepository from './UsuarioRepository.js';

export default class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  listarTodos(callback) {
    this.usuarioRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.usuarioRepository.getById(id, callback);
  }

  criar(usuario, callback) {
    this.usuarioRepository.create(usuario, callback);
  }

  atualizar(id, usuario, callback) {
    this.usuarioRepository.update(id, usuario, callback);
  }

  deletar(id, callback) {
    this.usuarioRepository.delete(id, callback);
  }
}
