import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class CursoRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Curso';
    return this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Curso WHERE id = ?';
    return this.connection.query(sql, [id], callback);
  }

  create(curso, callback) {
    const sql = 'INSERT INTO Curso (id, nome, duracao, creditos, carga_horaria) VALUES (?, ?, ?, ?, ?)';
    return this.connection.query(sql, [curso.id, curso.nome, curso.duracao, curso.creditos, curso.carga_horaria], callback);
  }

  update(id, curso, callback) {
    const sql = 'UPDATE Curso SET nome = ?, duracao = ?, creditos = ?, carga_horaria = ? WHERE id = ?';
    return this.connection.query(sql, [curso.nome, curso.duracao, curso.creditos, curso.carga_horaria, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Curso WHERE id = ?';
    return this.connection.query(sql, [id], callback);
  }
}
