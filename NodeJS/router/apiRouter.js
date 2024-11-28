import express from 'express';
import aboutPage from '../controller/AboutController';
import HomeController from '../controller/HomeController';
import getContact from '../controller/ContactController';
import ApiUserController from '../controller/ApiUserController.js';
import CategoryController from '../controller/CategoryController.js';
import ProductController from '../controller/ProductController.js';
import { handleGetAccount, handleLogin, handleLogout, cl_userMiddleware, cl_authMiddleware } from '../controller/authMiddlewareController';

const router = express.Router();

const initAPIRoute = (app) => {
    // User operations
    router.post('/createnewuser/', ApiUserController.insertUser);
    router.post('/login', handleLogin);
    router.get('/logout', cl_authMiddleware, handleLogout);
    router.get('/account', handleGetAccount);
    router.get('/deltauserbyusername/:username', cl_authMiddleware, cl_userMiddleware, ApiUserController.detailUserbyUsername);

    // Category and Product operations
    router.get('/category', CategoryController.getAllNhom);
    router.get('/productbycategory/:id', CategoryController.getAllNhom);
    router.get('/newproduct', ProductController.getNewProducts);
    router.get('/getproductbycategory/:id', ProductController.getSanPhamBynhom);

    // Get products by category
    router.get('/getproductbycategory/:id', ProductController.getSanPhamBynhom);
    router.get('/getproductbycategory/:id', ProductController.getSanPhamBynhom);
    
    // Home and Hello route
    router.get('/hello', HomeController.getHello);

    // Attach router to express app
    return app.use('/api/v1', router);
};

export default initAPIRoute;