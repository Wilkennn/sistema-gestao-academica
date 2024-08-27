import mysql from 'mysql2';

export default class Connection {
  constructor(config) {
    this.pool = mysql.createPool(config);
    this.poolPromise = this.pool.promise(); // Usar promessas
  }

  async connect() {
    try {
      await this.poolPromise.getConnection();
      console.log('Conectado ao banco de dados.');
    } catch (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    }
  }

  async disconnect() {
    try {
      await this.pool.end();
      console.log('Desconectado do banco de dados.');
    } catch (err) {
      console.error('Erro ao desconectar do banco de dados:', err);
    }
  }

  async query(sql, params) {
    try {
      const [results] = await this.poolPromise.query(sql, params);
      return results;
    } catch (err) {
      console.error('Erro ao executar a query:', err);
      throw err;
    }
  }
}
