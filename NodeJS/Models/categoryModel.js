import mysql from 'mysql2';
import promisePool from '../configs/db';

const getAllNhom = async (offset = 0, limit = 10) => {
    const sqlQuery = `SELECT idnhom, ten FROM nhom LIMIT ?, ?`;
    const [rows] = await promisePool.query(sqlQuery, [offset, limit]);
    return rows;
};

const countNhom = async () => {
    const [rows] = await promisePool.query(`SELECT COUNT(idnhom) AS total FROM nhom`);
    return rows[0].total;
};

const deleteNhomById = async (id) => {
        const [result] = await promisePool.query(`DELETE FROM nhom WHERE idnhom = ?`, [id]);
        return result.affectedRows;
};

const insertNhom = async (ten) => {
        const [result] = await promisePool.query(`INSERT INTO nhom (ten) VALUES (?)`, [ten]);
        return result.insertId;
};

const getCategoryById = async (idnhom) => {
        const [rows] = await promisePool.query(`SELECT idnhom, ten FROM nhom WHERE idnhom = ?`, [idnhom]);
        return rows[0];
};

const updateCategory = async (idnhom, ten) => {
        const [result] = await promisePool.query(`UPDATE nhom SET ten = ? WHERE idnhom = ?`, [ten, idnhom]);
        return result.affectedRows;
};

export default { getAllNhom, deleteNhomById, insertNhom, countNhom, getCategoryById, updateCategory };
