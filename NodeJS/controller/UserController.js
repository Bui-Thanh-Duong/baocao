import express from "express";
import userModel from '../Models/userModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ
import bcrypt from 'bcryptjs'

// Controller để lấy tất cả người dùng
const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
    const limit = 5; // Số lượng mục trên mỗi trang
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu lấy dữ liệu

    // Lấy số lượng người dùng tổng cộng
    const totalUsers = await userModel.countUsers(); 
    const totalPages = Math.ceil(totalUsers / limit);

    // Lấy danh sách người dùng theo phân trang
    let productList = await userModel.getAllUser(offset, limit);

    res.render('home', {
      data: {
        title: 'List User',
        page: 'listUser',
        rows: productList,
        currentPage: page,
        totalPages: totalPages
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users.");
  }
};

const viewUser = async (req, res) => {
  try {
    let deltaUser = await userModel.getUserById(req.params.id);
    res.render('home', {
      data: {
        title: 'Delta User',
        page: 'deltaUser',
        user: deltaUser
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user.");
  }
};


const deleteUser = async (req, res) => {
  let { id } = req.body; // Get the id from req.body, not req.params
  await userModel.deleteUserByID(id);
  res.redirect('/getuser');
};



const editUser = async (req, res) => {
  let id = req.params.id;
  let dataUser = await userModel.getUserById(id);
  res.render('home', { data: { title: 'Edit User', page: 'editUser', row: dataUser} });
};
const updateUser = async (req, res) => {
  const { id, username, password, fullname, address, sex, email } = req.body;
  await userModel.updateUser(id, username, password, fullname, address, sex, email);
  // Điều hướng tới trang chỉnh sửa của người dùng với ID đã được cập nhật
  res.redirect(`/edituser/${id}`);
};
// Controller để tạo người dùng mới
const createUser = (req, res) => {
  res.render('home', {
    data: {
      title: 'Create New User',
      page: 'createNewUser'
    }
  });
}
const insertUser = async (req, res) => {
  let {username, password, fullname, address, sex, email } = req.body;
  if (await userModel.isUserExist(username) || await userModel.isEmailExist(email)) {
    res.send("User or email already exists");
  } else {
    await userModel.insertUser(username, password, address, fullname, sex, email);
    res.redirect("/createNewUser"); 
  }
};

// Xuất các hàm controller để sử dụng trong routing
export { getAllUser, createUser, viewUser, deleteUser, editUser, updateUser, insertUser};
