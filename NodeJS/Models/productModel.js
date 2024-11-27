import express from 'express'
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../configs/connectDatabase'; // Đảm bảo rằng bạn đã xuất đúng đối tượng sequelize từ file kết nối.

// Định nghĩa mô hình `Nhom`
const Nhom = sequelize.define('Nhom', {
    idnhom: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ten: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'nhom',
    timestamps: false
});

// Định nghĩa mô hình `SanPham`
const SanPham = sequelize.define('SanPham', {
    masp: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ten: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gia: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hinhanh: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mota: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idnhom: {
        type: DataTypes.INTEGER,
        references: {
            model: Nhom,  // Liên kết với bảng `Nhom`
            key: 'idnhom'
        }
    }
}, {
    tableName: 'sanpham',  // Đảm bảo bảng đúng tên
    timestamps: false  // Nếu bảng không có cột createdAt, updatedAt
});

// Định nghĩa mối quan hệ giữa `SanPham` và `Nhom`
SanPham.belongsTo(Nhom, { foreignKey: 'idnhom', as: 'nhom' }); // SanPham có mối quan hệ 1-N với Nhom
Nhom.hasMany(SanPham, { foreignKey: 'idnhom', as: 'sanphams' }); // Nhom có nhiều SanPham

// Lấy tất cả sản phẩm
const getAllSanPham = async () => {
    try {
        const sanphams = await SanPham.findAll({
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']  // Chỉ lấy thuộc tính tên của nhóm
            },
            limit: 10,  // Giới hạn chỉ lấy 10 sản phẩm
            order: [['masp', 'DESC']]  // Sắp xếp theo ngày tạo mới nhất
        });
        return sanphams;
    } catch (error) {
        console.error('Error fetching latest products:', error);
        throw new Error('Could not fetch products.');
    }
};


// Lấy sản phẩm theo ID
const getSanPhamById = async (id) => {
    try {
        const sanpham = await SanPham.findOne({
            where: { masp: id },
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']
            }
        });
        if (!sanpham) {
            throw new Error('Product not found');
        }
        return sanpham;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

// Lấy sản phẩm theo ID nhóm
const getallSanPhamByCategory = async (idnhom, pageNumber = 1, pageSize = 10) => {
    try {
        const offset = (pageNumber - 1) * pageSize;
        const limit = pageSize;

        const sanphams = await SanPham.findAll({
            where: { idnhom },
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']
            },
            limit: limit,
            offset: offset
        });

        // Lấy tổng số sản phẩm trong danh mục này để tính tổng số trang
        const totalSanPham = await SanPham.count({ where: { idnhom } });

        return { sanphams, totalSanPham };
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Could not fetch products by category.');
    }
};

const getSanPhamByCategory = async (idnhom) => {
    try {
        const sanphams = await SanPham.findAll({
            where: { idnhom },
            include: {
                model: Nhom,
                as: 'nhom',  // Mối quan hệ giữa `SanPham` và `Nhom`
                attributes: ['ten']
            },
            limit: 5,  // Giới hạn chỉ lấy 10 sản phẩm
            order: [['masp', 'DESC']]  // Sắp xếp theo ngày tạo mới nhất
        });
        return sanphams;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Could not fetch products by category.');
    }
};

// Xóa sản phẩm theo ID
const deleteSanPhamById = async (id) => {
    try {
        const result = await SanPham.destroy({
            where: { masp: id }
        });
        if (result === 0) {
            throw new Error('No product found to delete');
        }
        return result;  // result là số lượng bản ghi bị xóa (nếu thành công)
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        throw error;
    }
};

// Cập nhật thông tin sản phẩm
const updateSanPham = async (id, ten, gia, hinhanh, mota, idnhom) => {
    try {
        const result = await SanPham.update(
            { ten, gia, hinhanh, mota, idnhom },
            {
                where: {
                    masp: id
                }
            }
        );
        if (result[0] === 0) {
            throw new Error('No product found to update');
        }
        return result;  // result là mảng [số lượng bản ghi được cập nhật, mảng bản ghi]
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Could not update product.');
    }
};

// Thêm sản phẩm mới
const insertSanPham = async (ten, gia, hinhanh, mota, idnhom) => {
    try {
        const newSanPham = await SanPham.create({ ten, gia, hinhanh, mota, idnhom });
        return newSanPham;  // newSanPham là bản ghi mới được tạo
    } catch (error) {
        console.error('Error inserting new product:', error);
        throw new Error('Could not insert product.');
    }
};

// Kiểm tra sản phẩm theo tên
const isSanPhamExist = async (ten) => {
    try {
        const existingSanPham = await SanPham.findOne({
            where: { ten }
        });
        return existingSanPham !== null;
    } catch (error) {
        console.error('Error checking product by name:', error);
        throw new Error('Error checking product existence.');
    }
};
const countProduct = async () => {
    return await SanPham.count(); // Trả về tổng số lượng người dùng
};

const getAllProduct = async (offset, limit) => {
    const productlist = await SanPham.findAll({
        offset: offset,
        limit: limit,
        order: [['masp', 'DESC']] // Sắp xếp id theo thứ tự giảm dần 
    });
    return productlist;
};


export default {
    getAllSanPham,
    getSanPhamById,
    deleteSanPhamById,
    updateSanPham,
    insertSanPham,
    isSanPhamExist,
    getSanPhamByCategory,
    getallSanPhamByCategory,
    countProduct,
    getAllProduct
};
