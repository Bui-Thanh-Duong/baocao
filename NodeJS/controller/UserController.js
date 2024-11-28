import userModel from '../Models/userModel.js';
import bcrypt from 'bcryptjs';

const getAllUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const totalUsers = await userModel.countUsers();
    const totalPages = Math.ceil(totalUsers / limit);
    const users = await userModel.getAllUsers(offset, limit);

    res.render('userList', { users, totalPages, currentPage: page });
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.render('userDetail', { user });
};

const createUser = async (req, res) => {
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
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, fullname, address, sex, email } = req.body;

    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

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
};

// Xóa người dùng theo ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const affectedRows = await userModel.deleteUserByID(id);

    if (affectedRows === 0) {
      return res.status(404).send("User not found.");
    }

    res.redirect('/users');
};

const checkUserExist = async (req, res) => {
    const { username } = req.params;
    const user = await userModel.isUserExist(username);

    if (user) {
      return res.status(400).send("Username already exists.");
    }

    res.status(200).send("Username is available.");
};

const checkEmailExist = async (req, res) => {
    const { email } = req.params;
    const emailExists = await userModel.isEmailExist(email);

    if (emailExists) {
      return res.status(400).send("Email already exists.");
    }

    res.status(200).send("Email is available.");
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