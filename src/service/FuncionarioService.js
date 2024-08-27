import FuncionarioRepository from '../repository/FuncionarioRepository.js';

export default class FuncionarioService {
  constructor() {
    this.funcionarioRepository = new FuncionarioRepository();
  }

  listarTodos(callback) {
    return this.funcionarioRepository.getAll(callback);
  }

  buscarPorId(id, callback) {
    return this.funcionarioRepository.getById(id, callback);
  }

  criar(funcionario, callback) {
    return this.funcionarioRepository.create(funcionario, callback);
  }

  atualizar(id, funcionario, callback) {
    return this.funcionarioRepository.update(id, funcionario, callback);
  }

  deletar(id, callback) {
    return this.funcionarioRepository.delete(id, callback);
  }
}
