import * as userModel from '../models/UserModel.js';

export const apiGetUsers = async (req, res) => {
    const users = await userModel.apiGetAllUsers();
    res.json(users);
};

export const apiCreateUser = async (req, res) => {
    await userModel.createUser(req.body);
    res.status(201).json({ message: 'User created successfully' });
};