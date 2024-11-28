import express from "express";
import userModel from '../Models/userModel';

const getHomePage = async (req, res) => {
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
};

const getHello = async (req, res) => {
    return res.send({ message: "Hello Baro!" });
};


export default { getHomePage, getHello };
