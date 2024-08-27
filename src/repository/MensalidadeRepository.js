import Connection from './Connection.js';

export default class MensalidadeRepository {
  constructor() {
    this.connection = new Connection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mydb'
    });
  }

  getAll(callback) {
    const sql = 'SELECT * FROM Mensalidade';
    this.connection.query(sql, [], callback);
  }

  getById(id, callback) {
    const sql = 'SELECT * FROM Mensalidade WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }

  create(mensalidade, callback) {
    const sql = 'INSERT INTO Mensalidade (id, valor, vencimento, status, Aluno_matricula) VALUES (?, ?, ?, ?, ?)';
    this.connection.query(sql, [mensalidade.id, mensalidade.valor, mensalidade.vencimento, mensalidade.status, mensalidade.Aluno_matricula], callback);
  }

  update(id, mensalidade, callback) {
    const sql = 'UPDATE Mensalidade SET valor = ?, vencimento = ?, status = ?, Aluno_matricula = ? WHERE id = ?';
    this.connection.query(sql, [mensalidade.valor, mensalidade.vencimento, mensalidade.status, mensalidade.Aluno_matricula, id], callback);
  }

  delete(id, callback) {
    const sql = 'DELETE FROM Mensalidade WHERE id = ?';
    this.connection.query(sql, [id], callback);
  }
}
