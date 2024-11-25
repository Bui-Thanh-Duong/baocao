import express from 'express';
import * as UserController from '../controllers/UserController.js';
import renderHome from '../controllers/HomeController.js';
import * as LoginController from '../controllers/LoginController.js';

const router = express.Router();

const apiRoute = (app) => {
    router.get('/', renderHome);
    router.get('/login', LoginController.renderLogin);
    router.get('/checklogin', LoginController.handleLogin);

    router.get('/users', UserController.apiGetUsers);
    router.post('/users', UserController.apiCreateUser);

    return app.use('/api/v1', router);
};

export default apiRoute;