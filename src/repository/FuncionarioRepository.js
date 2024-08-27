import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class FuncionarioRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Funcionario';
    this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Funcionario WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }

  create(funcionario, callback) {
    const sql = 'INSERT INTO Funcionario (id, nome, cpf, telefone, email, Cargo_id) VALUES (?, ?, ?, ?, ?, ?)';
    this.connection.query(sql, [funcionario.id, funcionario.nome, funcionario.cpf, funcionario.telefone, funcionario.email, funcionario.Cargo_id], callback);
  }

  update(id, funcionario, callback) {
    const sql = 'UPDATE Funcionario SET nome = ?, cpf = ?, telefone = ?, email = ?, Cargo_id = ? WHERE id = ?';
    this.connection.query(sql, [funcionario.nome, funcionario.cpf, funcionario.telefone, funcionario.email, funcionario.Cargo_id, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Funcionario WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }
}
