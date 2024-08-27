import AlunoRepository from '../repository/AlunoRepository.js';

export default class AlunoService {
  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  listarTodos(callback) {
    returnthis.alunoRepository.getAllAlunos(callback);
  }

  buscarPorId(matricula, callback) {
    return this.alunoRepository.getAlunoById(matricula, callback);
  }

  criar(aluno, callback) {
    return this.alunoRepository.createAluno(aluno, callback);
  }

  atualizar(matricula, aluno, callback) {
    return this.alunoRepository.updateAluno(matricula, aluno, callback);
  }

  deletar(matricula, callback) {
    return this.alunoRepository.deleteAluno(matricula, callback);
  }
}
