import { IEntityRepository } from './IEntityRepository.js';
import Connection from './connection.js';
import { config } from '../config/config.js';

const db = new Connection(config);

export class UserRepository extends IEntityRepository {
    
  constructor() {
    super();
    db.connect();
  }

  async create(user) {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [user.name, user.email, user.password], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  }

  async update(id, user) {
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [user.name, user.email, user.password, id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
