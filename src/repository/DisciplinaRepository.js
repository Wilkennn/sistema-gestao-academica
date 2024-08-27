import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class DisciplinaRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Disciplina';
    this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Disciplina WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }

  create(disciplina, callback) {
    const sql = 'INSERT INTO Disciplina (id, nome, carga_horaria, periodo, Curso_id) VALUES (?, ?, ?, ?, ?)';
    this.connection.query(sql, [disciplina.id, disciplina.nome, disciplina.carga_horaria, disciplina.periodo, disciplina.Curso_id], callback);
  }

  update(id, disciplina, callback) {
    const sql = 'UPDATE Disciplina SET nome = ?, carga_horaria = ?, periodo = ?, Curso_id = ? WHERE id = ?';
    this.connection.query(sql, [disciplina.nome, disciplina.carga_horaria, disciplina.periodo, disciplina.Curso_id, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Disciplina WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }
}
