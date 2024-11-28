import express from 'express';
import HomeController from '../controller/HomeController';
import { getAllUser, createUser, getUserById, deleteUser, editUser, updateUser, insertUser } from '../controller/UserController';
import ProductController from '../controller/ProductController';
import CategoryController from '../controller/CategoryController';
import upload from '../configs/upload';
import { sessionMiddleware, getLoginPage, loginUser, getLogoutPage, authMiddleware, adminMiddleware } from '../controller/authMiddlewareController';

const router = express.Router();

const initWebRoute = (app) => {
  // Home routes
  router.get('/', adminMiddleware, HomeController.getHomePage);

  // Login routes
  router.get('/login', getLoginPage);
  router.post('/login', loginUser);
  router.get('/logout', getLogoutPage);

  // Product routes
  router.get('/product', ProductController.getAllProduct);
  router.get('/deltaproduct/:id', ProductController.deltaProduct);
  router.get('/insertproduct/', adminMiddleware, ProductController.createProduct);
  router.post('/insertproduct/', adminMiddleware, upload('product').single('productImage'), ProductController.insertProduct);
  router.get('/listproduct', adminMiddleware, ProductController.getAllProduct);
  router.post('/deleteproduct', adminMiddleware, ProductController.deleteProduct);
  router.get('/editproduct/:masp', adminMiddleware, ProductController.updateProduct);
  router.post('/editproduct/', adminMiddleware, upload('product').single('productImage'), ProductController.updateProduct);

  // Category routes
  router.get('/category', CategoryController.getAllCategory);
  router.get('/insertcategory', adminMiddleware, CategoryController.insertCategory);
  router.post('/insertcategory', adminMiddleware, CategoryController.insertCategory);
  router.get('/listcategory', adminMiddleware, CategoryController.getAllCategory);
  router.post('/deletecategory', adminMiddleware, CategoryController.deleteCategory);
  router.get('/editcategory/:idnhom', adminMiddleware, CategoryController.editCategory);
  router.post('/editcategory/', adminMiddleware, CategoryController.updateCategory);

  // User management routes
  router.get('/getuser', adminMiddleware, getAllUser);  // List all users
  router.get('/deltauser/:id', adminMiddleware, getUserById);  // View user details
  router.post('/deleteuser/', adminMiddleware, deleteUser);  // Delete user
  router.get('/edituser/:id', adminMiddleware, updateUser);  // Edit user form
  router.post('/edituser/', adminMiddleware, updateUser);  // Update user
  router.get('/createnewuser/', adminMiddleware, createUser);  // Create new user form
  router.post('/createnewuser/', adminMiddleware, createUser);  // Insert new user

  // Route to fetch session info (for testing or debugging)
  router.get('/get-session', (req, res) => {
    res.send(req.session);
  });

  // Apply the session middleware
  app.use(sessionMiddleware);

  // Return the app use with the defined routes
  return app.use('/', router);
};

export default initWebRoute;
