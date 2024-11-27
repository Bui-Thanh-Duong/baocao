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

    // thao tác với user
    router.post('/createnewuser/', ApiUserController.insertUser)

    // đăng nhập
    router.post('/login', handleLogin)
    router.get('/logout', cl_authMiddleware, handleLogout)
    router.get('/account', handleGetAccount)
    router.get('/deltauserbyusername/:username', cl_authMiddleware, cl_userMiddleware, ApiUserController.detailUserbyUsername)
    

    router.get('/category', CategoryController.getAllNhom)
    router.get('/productbycategory/:id', CategoryController.getAllNhom)

    router.get('/newproduct', ProductController.getAllSanPham)
    router.get('/deltaproduct/:id', ProductController.deltaSanpham);


    router.get('/getallproductbycategory/:id', ProductController.getAllSanPhamBynhom);
    router.get('/getproductbycategory/:id', ProductController.getSanPhamBynhom);
    
    router.get('/hello', HomeController.getHello);

    // Gắn router vào ứng dụng Express
    return app.use('/api/v1', router);
};

export default initAPIRoute;