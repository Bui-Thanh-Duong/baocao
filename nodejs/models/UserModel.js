import db from '../config/db.js';

export const apiGetAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM khachhang');
    return rows;
};

export const createUser = async (data) => {
    const { username, password } = data;
    await db.query('INSERT INTO khachhang (username, password) VALUES (?, ?)', [username, password]);
};