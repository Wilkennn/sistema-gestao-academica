import DisciplinaRepository from './DisciplinaRepository.js';

export default class DisciplinaService {
  constructor() {
    this.disciplinaRepository = new DisciplinaRepository();
  }

  listarTodos(callback) {
    this.disciplinaRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.disciplinaRepository.getById(id, callback);
  }

  criar(disciplina, callback) {
    this.disciplinaRepository.create(disciplina, callback);
  }

  atualizar(id, disciplina, callback) {
    this.disciplinaRepository.update(id, disciplina, callback);
  }

  deletar(id, callback) {
    this.disciplinaRepository.delete(id, callback);
  }
}
