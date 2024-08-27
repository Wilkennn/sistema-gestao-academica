import Connection from './Connection.js';

export default class CargoRepository {
  constructor() {
    this.connection = new Connection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mydb'
    });
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
