import express from "express";
import userModel from '../Models/productModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ
import user2Model from '../Models/categoryModel'
import upload from '../configs/upload';
import fs from 'fs/promises'; // Dùng promises để thao tác file
import path from 'path';
const deltaProduct = async (req, res) => {
  try {
    let deltaProduct = await userModel.getSanPhamById(req.params.id);
    res.render('home', {
      data: {
        title: 'Delta Product',
        page: 'deltaProduct',
        product: deltaProduct
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Product.");
  }
};
// Thêm sản phẩm
const createProduct = async (req, res) => {
  let error =""
  let category = await user2Model.getAllNhom();
  res.render('home', {
    data: {
      title: 'Create New User',
      page: 'insertProduct',
      category: category,
    }
  });
}
// thêm vào hệ thống
const insertProduct = async (req, res) => {
  try {
      const { productName, productPrice, productDescription, productGroup } = req.body;
      const productImage = req.file ? req.file.filename : null; // Lấy tên file hình ảnh

      // Gọi hàm insertSanPham để thêm sản phẩm vào cơ sở dữ liệu
      const newProduct = await userModel.insertSanPham(productName, productPrice, productImage, productDescription, productGroup);

      // Chuyển hướng đến trang danh sách sản phẩm hoặc trang khác
      res.redirect('/insertproduct');
  } catch (error) {
      console.error('Error inserting product:', error);
      res.status(500).send('Lỗi khi thêm sản phẩm');
  }
};
const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
    const limit = 8; // Số lượng mục trên mỗi trang
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu lấy dữ liệu
    // Lấy số lượng người dùng tổng cộng
    const totalUsers = await userModel.countProduct(); 
    const totalPages = Math.ceil(totalUsers / limit);
    // Lấy danh sách người dùng theo phân trang
    let Listproduct = await userModel.getAllProduct(offset, limit);
        res.render('home', {
      data: {
        title: 'List Product',
        page: 'listProduct',
        rows: Listproduct,
        currentPage: page,
        totalPages: totalPages
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi tải dữ liệu.");
  }
};
const deleteSanPham = async (req, res) => {
  try {
    const { masp } = req.body;
    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    const product = await userModel.getSanPhamById(masp);
    if (!product) {
      return res.status(404).send("Sản phẩm không tồn tại.");
    }

    // Xóa sản phẩm khỏi cơ sở dữ liệu
    await userModel.deleteSanPhamById(masp);

    // Xóa hình ảnh nếu tồn tại
    if (product.hinhanh) {
      const imagePath = path.resolve('images/product', product.hinhanh);
      try {
        await fs.unlink(imagePath);
        console.log(`Đã xóa file: ${imagePath}`);
      } catch (err) {
        console.error(`Lỗi khi xóa file hình ảnh: ${err.message}`);
      }
    }
    res.redirect('/listProduct');
  } catch (error) {
    console.error("Lỗi khi thực hiện câu truy vấn:", error);
    res.status(500).send("Lỗi khi thực hiện câu truy vấn.");
  }
};
const editProduct = async (req, res) => {
  const { masp } = req.params;
  const category = await user2Model.getAllNhom();
  const product = await userModel.getSanPhamById(masp)
  return res.render('home', {
    data: {
      title: 'List Product',
      page: 'editProduct',
      product: product,
      category: category
    }
  })
}
const updateProduct = async (req, res) => {
  try {
    const { masp, productName, productPrice, productDescription, productGroup, oldImage } = req.body;

    // Lấy tên ảnh mới, nếu không có ảnh mới thì giữ ảnh cũ
    let newImageName = oldImage; // oldImage là tên ảnh cũ

    // Nếu có ảnh mới
    if (req.file) {
      newImageName = req.file.filename; // Lấy tên ảnh mới từ multer
    }
    console.log(oldImage)
    // Nếu có ảnh cũ và ảnh mới được thay thế, xóa ảnh cũ
    if (oldImage && newImageName !== oldImage) {
      const oldImagePath = path.resolve('images/product', oldImage);
      fs.unlink(oldImagePath); // Xóa ảnh cũ
    }

    // Cập nhật thông tin sản phẩm
    const updatedProduct = await userModel.updateSanPham(masp, productName, productPrice, newImageName, productDescription, productGroup);

    // Kiểm tra nếu cập nhật thành công
    if (updatedProduct) {
      // Điều hướng lại trang hiển thị chi tiết sản phẩm sau khi cập nhật
      res.redirect(`/editproduct/${masp}`);
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// API
// API
// API
const deltaSanpham = async (req, res) => {
  try {
    // Lấy dữ liệu sản phẩm từ ID
    let data = await userModel.getSanPhamById(req.params.id);
    
    // Kiểm tra nếu không tìm thấy sản phẩm
    if (!data) {
      // Trả về lỗi nếu không tìm thấy sản phẩm
      return res.status(404).json({
        errCode: 0,
        message: "Sản phẩm không tồn tại"
      });
    }
    
    // Trả về dữ liệu sản phẩm nếu tìm thấy
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      deltaProduct: data
    });

  } catch (error) {
    // Bắt lỗi và trả về thông báo lỗi cho client
    console.error(error);
    return res.status(500).json({
      errCode: 0,
      message: "Đã xảy ra lỗi khi lấy dữ liệu sản phẩm."
    });
  }
};

const getAllSanPham = async (req, res) => {
  let products = await userModel.getAllSanPham();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    products: products
  })
}
const getAllSanPhamBynhom = async (req, res) => {
  const pageNumber = parseInt(req.query.page_number) || 1; // Mặc định là trang 1
  const pageSize = 10; // Số sản phẩm mỗi trang
  const idnhom = req.params.id;

  try {
      const { sanphams, totalSanPham } = await userModel.getallSanPhamByCategory(idnhom, pageNumber, pageSize);
      const totalPages = Math.ceil(totalSanPham / pageSize);

      return res.status(200).json({
          errCode: 1,
          message: "Success",
          productbycategory: sanphams,
          totalPages: totalPages
      });
  } catch (error) {
      return res.status(500).json({
          errCode: 0,
          message: "Có lỗi xảy ra khi tải sản phẩm",
      });
  }
};

const getSanPhamBynhom = async (req, res) => {
  let data = await userModel.getSanPhamByCategory(req.params.id);
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    productbycategory: data
  })
}


export default { 
  getAllSanPham, 
  deltaSanpham, 
  getAllProduct, 
  deltaProduct, 
  getAllSanPhamBynhom, 
  getSanPhamBynhom, 
  createProduct, 
  insertProduct,
  deleteSanPham,
  editProduct,
  updateProduct
};