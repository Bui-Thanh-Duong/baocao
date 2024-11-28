import mysql from 'mysql2';
import promisePool from '../configs/db';

// Các hàm xử lý sản phẩm
const getAllSanPham = async () => {
    try {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            ORDER BY sp.masp DESC
            LIMIT 10
        `);
        return rows;
    } catch (error) {
        console.error('Error fetching latest products:', error);
        throw new Error('Could not fetch products.');
    }
};

const getSanPhamByCategory = async (categoryId) => {
    try {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            WHERE sp.idnhom = ?
        `, [categoryId]);
        return rows;  // Trả về danh sách sản phẩm thuộc nhóm đó
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Could not fetch products by category.');
    }
};


const getSanPhamById = async (id) => {
    try {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            WHERE sp.masp = ?
        `, [id]);
        return rows[0];  // Trả về sản phẩm tìm thấy
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Could not fetch product by ID.');
    }
};

const insertSanPham = async (ten, gia, hinhanh, mota, idnhom) => {
    try {
        const [result] = await promisePool.query(`
            INSERT INTO sanpham (ten, gia, hinhanh, mota, idnhom)
            VALUES (?, ?, ?, ?, ?)
        `, [ten, gia, hinhanh, mota, idnhom]);
        return result.insertId;  // Trả về ID của sản phẩm vừa thêm
    } catch (error) {
        console.error('Error inserting product:', error);
        throw new Error('Could not insert product.');
    }
};

const countProduct = async () => {
    try {
        const [rows] = await promisePool.query(`
            SELECT COUNT(*) AS total FROM sanpham
        `);
        return rows[0].total;  // Trả về tổng số sản phẩm
    } catch (error) {
        console.error('Error counting products:', error);
        throw new Error('Could not count products.');
    }
};

const getAllProduct = async (offset, limit) => {
    try {
        const [rows] = await promisePool.query(`
            SELECT sp.masp, sp.ten, sp.gia, sp.hinhanh, sp.mota, nhom.ten AS nhom
            FROM sanpham sp
            JOIN nhom ON sp.idnhom = nhom.idnhom
            LIMIT ?, ?
        `, [offset, limit]);
        return rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Could not fetch products.');
    }
};

const deleteSanPham = async (id) => {
    try {
        const [result] = await promisePool.query(`
            DELETE FROM sanpham WHERE masp = ?
        `, [id]);
        return result.affectedRows > 0;  // Trả về true nếu xóa thành công
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Could not delete product.');
    }
};

const updateProduct = async (masp, productName, productPrice, productImage, productDescription, productGroup) => {
    try {
      const [result] = await pool.query(
        `UPDATE products SET productName = ?, productPrice = ?, productImage = ?, productDescription = ?, productGroup = ? WHERE masp = ?`,
        [productName, productPrice, productImage, productDescription, productGroup, masp]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating product in database:', error);
      throw error;
    }
  };

export default {
    getAllSanPham,
    getSanPhamById,
    insertSanPham,
    countProduct,
    getAllProduct,
    deleteSanPham,
    updateProduct,
    getSanPhamByCategory
};
