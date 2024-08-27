import Connection from '../connection/connection.js';
import { config } from '../config/config.js';

export default class NotificacaoRepository {
  constructor() {
    this.connection = new Connection(config);
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Notificacao';
    return this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Notificacao WHERE id = ?';
    return this.connection.query(sql, [id], callback);
  }

  create(notificacao, callback) {
    const sql = 'INSERT INTO Notificacao (id, mensagem, data, Usuario_id) VALUES (?, ?, ?, ?)';
    return this.connection.query(sql, [notificacao.id, notificacao.mensagem, notificacao.data, notificacao.Usuario_id], callback);
  }

  update(id, notificacao, callback) {
    const sql = 'UPDATE Notificacao SET mensagem = ?, data = ?, Usuario_id = ? WHERE id = ?';
    return this.connection.query(sql, [notificacao.mensagem, notificacao.data, notificacao.Usuario_id, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Notificacao WHERE id = ?';
    return this.connection.query(sql, [id], callback);
  }
}
