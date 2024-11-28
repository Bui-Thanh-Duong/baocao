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
    try {
        const [result] = await promisePool.query(`DELETE FROM nhom WHERE idnhom = ?`, [id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting category by ID:', error);
        throw new Error('Could not delete category.');
    }
};

const insertNhom = async (ten) => {
    try {
        const [result] = await promisePool.query(`INSERT INTO nhom (ten) VALUES (?)`, [ten]);
        return result.insertId;
    } catch (error) {
        console.error('Error inserting new category:', error);
        throw new Error('Could not insert new category.');
    }
};

const getCategoryById = async (idnhom) => {
    try {
        const [rows] = await promisePool.query(`SELECT idnhom, ten FROM nhom WHERE idnhom = ?`, [idnhom]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw new Error('Could not fetch category by ID.');
    }
};

const updateCategory = async (idnhom, ten) => {
    try {
        const [result] = await promisePool.query(`UPDATE nhom SET ten = ? WHERE idnhom = ?`, [ten, idnhom]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Could not update category.');
    }
};

export default { getAllNhom, deleteNhomById, insertNhom, countNhom, getCategoryById, updateCategory };
