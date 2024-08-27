import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class AlunoRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAllAlunos(callback) {
    const sql = 'SELECT * FROM Aluno';
    this.connection.query(sql, [], callback);
  }

  getAlunoById(matricula, callback) {
    const sql = 'SELECT * FROM Aluno WHERE matricula = ?';
    this.connection.query(sql, [matricula], callback);
  }

  createAluno(aluno, callback) {
    const sql = 'INSERT INTO Aluno (matricula, periodo, data_ingresso, AlunoStatus_id) VALUES (?, ?, ?, ?)';
    this.connection.query(sql, [aluno.matricula, aluno.periodo, aluno.data_ingresso, aluno.AlunoStatus_id], callback);
  }

  updateAluno(matricula, aluno, callback) {
    const sql = 'UPDATE Aluno SET periodo = ?, data_ingresso = ?, AlunoStatus_id = ? WHERE matricula = ?';
    this.connection.query(sql, [aluno.periodo, aluno.data_ingresso, aluno.AlunoStatus_id, matricula], callback);
  }

  deleteAluno(matricula, callback) {
    const sql = 'DELETE FROM Aluno WHERE matricula = ?';
    this.connection.query(sql, [matricula], callback);
  }
}
