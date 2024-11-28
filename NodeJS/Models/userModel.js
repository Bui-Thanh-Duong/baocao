import pool from '../configs/db.js';

const getAllUsers = async (offset, limit) => {
  const [rows] = await pool.query(
    `SELECT * FROM users LIMIT ?, ?`,
    [offset, limit]
  );
  return rows;
};

const countUsers = async () => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total FROM users`
  );
  return rows[0].total;
};

const getUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE id = ?`,
    [id]
  );
  return rows[0];
};

const getUserByUsername = async (username) => {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE username = ?`,
    [username]
  );
  return rows[0];
};

const insertUser = async (user) => {
  const { username, password, fullname, address, sex, email } = user;
  const [result] = await pool.query(
    `INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)`,
    [username, password, fullname, address, sex, email]
  );
  return result.insertId;
};

const updateUser = async (id, user) => {
  const { username, password, fullname, address, sex, email } = user;
  const [result] = await pool.query(
    `UPDATE users SET username = ?, password = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?`,
    [username, password, fullname, address, sex, email, id]
  );
  return result.affectedRows;
};

const deleteUserByID = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );
  return result.affectedRows;
};

const isUserExist = async (username) => {
  const user = await getUserByUsername(username);
  return !!user;
};

const isEmailExist = async (email) => {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );
  return rows.length > 0;
};

export default {
  getAllUsers,
  countUsers,
  getUserById,
  getUserByUsername,
  insertUser,
  updateUser,
  deleteUserByID,
  isUserExist,
  isEmailExist,
};