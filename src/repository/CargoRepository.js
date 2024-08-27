import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class CargoRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Cargo';
    this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Cargo WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }

  create(cargo, callback) {
    const sql = 'INSERT INTO Cargo (id, nome) VALUES (?, ?)';
    this.connection.query(sql, [cargo.id, cargo.nome], callback);
  }

  update(id, cargo, callback) {
    const sql = 'UPDATE Cargo SET nome = ? WHERE id = ?';
    this.connection.query(sql, [cargo.nome, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Cargo WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }
}
