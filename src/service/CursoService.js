import CursoRepository from '../repository/CursoRepository.js';

export default class CursoService {
  constructor() {
    this.cursoRepository = new CursoRepository();
  }

  listarTodos(callback) {
    return this.cursoRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.cursoRepository.getById(id, callback);
  }

  criar(curso, callback) {
    return this.cursoRepository.create(curso, callback);
  }

  atualizar(id, curso, callback) {
    return this.cursoRepository.update(id, curso, callback);
  }

  deletar(id, callback) {
    return this.cursoRepository.delete(id, callback);
  }
}
