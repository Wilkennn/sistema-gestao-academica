import { Connection } from '../connection/connection.js';
import IEntityRepository from './IEntityRepository.js';

export class UserRepository extends IEntityRepository {
    constructor() {
        super();
        this.connection = new Connection();
    }

    async findAll() {
        const pool = await this.connection.getConnection();
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } finally {
            pool.release();
        }
    }

    async findById(id) {
        const pool = await this.connection.getConnection();
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows.length > 0 ? rows[0] : null;
        } finally {
            pool.release();
        }
    }

    async create(user) {
        const pool = await this.connection.getConnection();
        try {
            const { name, email, password } = user;
            const [result] = await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password]
            );
            return { id: result.insertId, ...user };
        } finally {
            pool.release();
        }
    }

    async update(id, user) {
        const pool = await this.connection.getConnection();
        try {
            const { name, email, password } = user;
            await pool.query(
                'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
                [name, email, password, id]
            );
            return { id, ...user };
        } finally {
            pool.release();
        }
    }

    async delete(id) {
        const pool = await this.connection.getConnection();
        try {
            await pool.query('DELETE FROM users WHERE id = ?', [id]);
        } finally {
            pool.release();
        }
    }
}

export default UserRepository;
