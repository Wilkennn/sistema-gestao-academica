import mysql from 'mysql2';

export default class Connection {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  connect() {
    if (this.connection) {
      console.log('Já está conectado ao banco de dados.');
      return;
    }

    this.connection = mysql.createConnection(this.config);

    this.connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
      }
      console.log('Conectado ao banco de dados.');
    });
  }

  disconnect() {
    if (!this.connection) {
      console.log('Não há conexão para fechar.');
      return;
    }

    this.connection.end((err) => {
      if (err) {
        console.error('Erro ao desconectar do banco de dados:', err);
        return;
      }
      console.log('Desconectado do banco de dados.');
    });
  }

  query(sql, params, callback) {
    if (!this.connection) {
      console.error('Não há conexão ao banco de dados.');
      return;
    }

    this.connection.query(sql, params, (err, results) => {
      if (err) {
        console.error('Erro ao executar a query:', err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}
