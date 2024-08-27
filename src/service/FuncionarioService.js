import FuncionarioRepository from '../repository/FuncionarioRepository.js';

export default class FuncionarioService {
  constructor() {
    this.funcionarioRepository = new FuncionarioRepository();
  }

  listarTodos(callback) {
    this.funcionarioRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    this.funcionarioRepository.getById(id, callback);
  }

  criar(funcionario, callback) {
    this.funcionarioRepository.create(funcionario, callback);
  }

  atualizar(id, funcionario, callback) {
    this.funcionarioRepository.update(id, funcionario, callback);
  }

  deletar(id, callback) {
    this.funcionarioRepository.delete(id, callback);
  }
}
