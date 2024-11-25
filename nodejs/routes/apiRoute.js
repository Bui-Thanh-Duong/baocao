import express from 'express';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();

const apiRoute = (app) => {
    router.get('/users', UserController.apiGetUsers);
    router.post('/users', UserController.apiCreateUser);

    return app.use('/api/v1', router);
};

export default apiRoute;