import AlunoRepository from '../repository/AlunoRepository.js';

export default class AlunoService {
  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  listarTodos(callback) {
    this.alunoRepository.getAllAlunos(callback);
  }

  buscarPorId(matricula, callback) {
    this.alunoRepository.getAlunoById(matricula, callback);
  }

  criar(aluno, callback) {
    this.alunoRepository.createAluno(aluno, callback);
  }

  atualizar(matricula, aluno, callback) {
    this.alunoRepository.updateAluno(matricula, aluno, callback);
  }

  deletar(matricula, callback) {
    this.alunoRepository.deleteAluno(matricula, callback);
  }
}
