// LoginModel.js
import db from '../config/db.js';

export const getUserByUsername = async (username) => {
    const query = `SELECT * FROM khachhang WHERE username = '${username}'`;
    const [[user]] = await db.execute(query);
    return user;
};
