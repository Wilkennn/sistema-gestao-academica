import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class MensalidadeRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Mensalidade';
    return this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Mensalidade WHERE id = ?';
    return this.connection.query(sql, [id], callback);
  }

  create(mensalidade, callback) {
    const sql = 'INSERT INTO Mensalidade (id, valor, vencimento, status, Aluno_matricula) VALUES (?, ?, ?, ?, ?)';
    return this.connection.query(sql, [mensalidade.id, mensalidade.valor, mensalidade.vencimento, mensalidade.status, mensalidade.Aluno_matricula], callback);
  }

  update(id, mensalidade, callback) {
    const sql = 'UPDATE Mensalidade SET valor = ?, vencimento = ?, status = ?, Aluno_matricula = ? WHERE id = ?';
    return this.connection.query(sql, [mensalidade.valor, mensalidade.vencimento, mensalidade.status, mensalidade.Aluno_matricula, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Mensalidade WHERE id = ?';
    return this.connection.query(sql, [id], callback);
  }
}
