import DisciplinaRepository from '../repository/DisciplinaRepository.js';

export default class DisciplinaService {
  constructor() {
    this.disciplinaRepository = new DisciplinaRepository();
  }

  listarTodos(callback) {
    return this.disciplinaRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.disciplinaRepository.getById(id, callback);
  }

  criar(disciplina, callback) {
    return this.disciplinaRepository.create(disciplina, callback);
  }

  atualizar(id, disciplina, callback) {
    return this.disciplinaRepository.update(id, disciplina, callback);
  }

  deletar(id, callback) {
    return this.disciplinaRepository.delete(id, callback);
  }
}
