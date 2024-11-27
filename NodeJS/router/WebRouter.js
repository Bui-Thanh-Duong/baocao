import express from 'express'
import HomeController from '../controller/HomeController'
import { getAllUser } from '../controller/UserController';
import { viewUser } from '../controller/UserController';
import { deleteUser } from '../controller/UserController';
import { editUser } from '../controller/UserController';
import { updateUser } from '../controller/UserController';
import { createUser } from '../controller/UserController';
import { insertUser } from '../controller/UserController';
import ProductController from '../controller/ProductController';
import CategoryController from '../controller/CategoryController';
import upload from '../configs/upload';
import { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware } from '../controller/authMiddlewareController';
import categoryModel from '../Models/categoryModel';
const router = express.Router()
const initWebRoute = (app) => {
    router.get('/', adminMiddleware, HomeController.getHomePage)
    router.get('/login', getLoginPage)
    router.post('/login', loginUser)
    router.get('/logout', getLogoutPage)
    router.get('/product', ProductController.getAllProduct)
    router.get('/deltaproduct/:id', ProductController.deltaProduct)
    router.get('/category', CategoryController.getAllCategory)


    router.get('/getuser', adminMiddleware, getAllUser)
    router.get('/deltauser/:id', adminMiddleware, viewUser)
    router.post('/deleteuser/', adminMiddleware, deleteUser)
    router.get('/edituser/:id', adminMiddleware, editUser)
    router.post('/edituser/', adminMiddleware, updateUser)
    router.get('/createnewuser/', adminMiddleware, createUser)
    router.post('/createnewuser/', adminMiddleware, insertUser)


    // product
    router.get('/insertproduct/', adminMiddleware, ProductController.createProduct)
    router.post('/insertproduct/', adminMiddleware, upload('product').single('productImage'), ProductController.insertProduct)
    router.get('/listproduct', adminMiddleware, ProductController.getAllProduct)
    router.post('/deleteproduct', adminMiddleware, ProductController.deleteSanPham)
    router.get('/editproduct/:masp', adminMiddleware, ProductController.editProduct)
    router.post('/editproduct/', adminMiddleware, upload('product').single('productImage'), ProductController.updateProduct);
    
    // category
    router.get('/insertcategory', adminMiddleware, CategoryController.createloai)
    router.post('/insertcategory', adminMiddleware, CategoryController.insertloai )
    router.get('/listcategory', adminMiddleware, CategoryController.getAllnhom)
    router.post('/deletecategory', adminMiddleware, CategoryController.deleteNhom)
    router.get('/editcategory/:idnhom', adminMiddleware, CategoryController.editCategory)
    router.post('/editcategory/', adminMiddleware, CategoryController.updateCategory)

    // Route để lấy thông tin từ session
    router.get('/get-session', (req, res) => {
        res.send(req.session);
    });
    router.get('/date', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.send(`${date()}`);
    });
    router.get('/geturl', (req, res) => {
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`${getURL_ES6.getPath(req)}<br/>`);
        res.write(`${getURL_ES6.getParamesURL(req)}<br/>`);
    });
    app.use(sessionMiddleware);
    return app.use('/', router)
}
export default initWebRoute


