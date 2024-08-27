import CursoRepository from '../repository/CursoRepository.js';

export default class CursoService {
  constructor() {
    this.cursoRepository = new CursoRepository();
  }

  listarTodos(callback) {
    this.cursoRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.cursoRepository.getById(id, callback);
  }

  criar(curso, callback) {
    this.cursoRepository.create(curso, callback);
  }

  atualizar(id, curso, callback) {
    this.cursoRepository.update(id, curso, callback);
  }

  deletar(id, callback) {
    this.cursoRepository.delete(id, callback);
  }
}
