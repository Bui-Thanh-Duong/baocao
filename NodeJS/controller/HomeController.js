import express from "express";
import userModel from '../Models/userModel';

const getHomePage = async (req, res) => {
    try {
        if (req.session && req.session.user) {
            const id = req.session.user.id;
            const deltaUser = await userModel.getUserById(id);

            return res.render('home', {
                data: {
                    title: 'Home Page',
                    page: 'main',
                    user: deltaUser
                }
            });
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).send("Error retrieving user.");
    }
};

const getHello = async (req, res) => {
    return res.send({ message: "Tên của tôi là BARO" });
};


export default { getHomePage, getHello };
