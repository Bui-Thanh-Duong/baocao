import userModel from '../Models/userModel.js';
import bcrypt from 'bcryptjs';

// Lấy tất cả người dùng
const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const totalUsers = await userModel.countUsers();
    const totalPages = Math.ceil(totalUsers / limit);
    const users = await userModel.getAllUsers(offset, limit);

    res.render('userList', { users, totalPages, currentPage: page });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users.");
  }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.render('userDetail', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user.");
  }
};

// Tạo người dùng mới
const createUser = async (req, res) => {
  try {
    const { username, password, fullname, address, sex, email } = req.body;

    if (await userModel.isUserExist(username)) {
      return res.status(400).send("Username already exists.");
    }

    if (await userModel.isEmailExist(email)) {
      return res.status(400).send("Email already exists.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await userModel.insertUser({ username, password: hashedPassword, fullname, address, sex, email });

    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user.");
  }
};

// Sửa thông tin người dùng
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, fullname, address, sex, email } = req.body;

    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Nếu password có thay đổi, băm lại mật khẩu
    const updatedUser = {
      username,
      password: password ? bcrypt.hashSync(password, 10) : user.password,
      fullname,
      address,
      sex,
      email
    };

    const affectedRows = await userModel.updateUser(id, updatedUser);
    if (affectedRows === 0) {
      return res.status(500).send("Error updating user.");
    }

    res.redirect(`/users/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user.");
  }
};

// Xóa người dùng theo ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await userModel.deleteUserByID(id);

    if (affectedRows === 0) {
      return res.status(404).send("User not found.");
    }

    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user.");
  }
};

// Kiểm tra nếu người dùng đã tồn tại
const checkUserExist = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.isUserExist(username);

    if (user) {
      return res.status(400).send("Username already exists.");
    }

    res.status(200).send("Username is available.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error checking username.");
  }
};

// Kiểm tra nếu email đã tồn tại
const checkEmailExist = async (req, res) => {
  try {
    const { email } = req.params;
    const emailExists = await userModel.isEmailExist(email);

    if (emailExists) {
      return res.status(400).send("Email already exists.");
    }

    res.status(200).send("Email is available.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error checking email.");
  }
};

export {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkUserExist,
  checkEmailExist
};