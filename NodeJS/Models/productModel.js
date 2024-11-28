import mysql from 'mysql2';
import promisePool from '../configs/db';

const getAllSanPham = async () => {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            ORDER BY sp.masp DESC
            LIMIT 10
        `);
        return rows;
};

const getSanPhamByCategory = async (categoryId) => {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            WHERE sp.idnhom = ?
        `, [categoryId]);
        return rows;
};

const getSanPhamById = async (id) => {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            WHERE sp.masp = ?
        `, [id]);

        if (rows.length === 0) {
            throw new Error('Product not found');
        }

        return rows[0];
};

const insertSanPham = async (ten, gia, hinhanh, mota, idnhom) => {
        const [result] = await promisePool.query(`
            INSERT INTO sanpham (ten, gia, hinhanh, mota, idnhom)
            VALUES (?, ?, ?, ?, ?)
        `, [ten, gia, hinhanh, mota, idnhom]);
        return result.insertId;
};

const countProduct = async () => {
        const [rows] = await promisePool.query(`
            SELECT COUNT(*) AS total FROM sanpham
        `);
        return rows[0].total;
};

const getAllProduct = async (offset, limit) => {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            LIMIT ?, ?
        `, [offset, limit]);
        return rows;
};

const deleteSanPham = async (id) => {
        const [result] = await promisePool.query(`
            DELETE FROM sanpham WHERE masp = ?
        `, [id]);
        return result.affectedRows > 0;
};

const updateProduct = async (masp, productName, productPrice, productImage, productDescription, productGroup) => {
      const [result] = await pool.query(
        `UPDATE products SET productName = ?, productPrice = ?, productImage = ?, productDescription = ?, productGroup = ? WHERE masp = ?`,
        [productName, productPrice, productImage, productDescription, productGroup, masp]
      );
      return result.affectedRows > 0;
  };

  const getNewProduct = async (offset, limit) => {
      const [rows] = await promisePool.query(`
        SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
        FROM sanpham sp
        JOIN nhom ON sp.idnhom = nhom.idnhom
        ORDER BY sp.masp DESC
        LIMIT ?, ?
      `, [offset, limit]);

      return rows;
  };

export default {
    getAllSanPham,
    getSanPhamById,
    insertSanPham,
    countProduct,
    getAllProduct,
    deleteSanPham,
    updateProduct,
    getSanPhamByCategory,
    getNewProduct
};