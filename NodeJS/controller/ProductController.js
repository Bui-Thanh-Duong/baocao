import productModel from '../Models/productModel';

const deltaProduct = async (req, res) => {
    try {
        const product = await productModel.getSanPhamById(req.params.id);
        res.render('home', {
            data: {
                title: 'Delta Product',
                page: 'deltaProduct',
                product: product
            }
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Error retrieving product.');
    }
};

const createProduct = async (req, res) => {
    try {
        const categories = await productModel.getAllCategories();
        res.render('home', {
            data: {
                title: 'Create New Product',
                page: 'insertProduct',
                categories: categories
            }
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error loading product creation page.');
    }
};

const insertProduct = async (req, res) => {
    try {
        const { productName, productPrice, productDescription, productGroup } = req.body;
        const productImage = req.file ? req.file.filename : null;

        const newProductId = await productModel.insertSanPham(productName, productPrice, productImage, productDescription, productGroup);

        res.redirect('/insertproduct');
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).send('Error adding product.');
    }
};

const getAllProduct = async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const offset = (page - 1) * limit;
        const totalProducts = await productModel.countProduct();
        const totalPages = Math.ceil(totalProducts / limit);
        const productList = await productModel.getAllProduct(offset, limit);

        res.render('home', {
            data: {
                title: 'List Products',
                page: 'listProduct',
                products: productList,
                currentPage: page,
                totalPages: totalPages
            }
        });
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await productModel.deleteSanPham(req.params.id);
        if (deleted) {
            res.redirect('/products');
        } else {
            res.status(404).send('Product not found.');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product.');
    }
};

const getAllSanPhamBynhom = async (req, res) => {
  const pageNumber = parseInt(req.query.page_number) || 1; // Default page is 1
  const pageSize = 10; // Number of products per page
  const idnhom = req.params.id; // Category ID from the route parameter

  try {
    // Fetch products and total count by category ID
    const { sanphams, totalSanPham } = await productModel.getAllSanPhamByCategory(idnhom, pageNumber, pageSize);
    
    const totalPages = Math.ceil(totalSanPham / pageSize); // Calculate total pages based on total products

    // Respond with the paginated products
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      productbycategory: sanphams,  // Products for the given category
      totalPages: totalPages       // Total number of pages
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({
      errCode: 0,
      message: "An error occurred while loading the products.",
    });
  }
};

const getSanPhamBynhom = async (req, res) => {
  const idnhom = req.params.id; // Category ID from the route parameter

  try {
    // Fetch all products by category
    const data = await productModel.getSanPhamByCategory(idnhom);

    // Respond with the products for the given category
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      productbycategory: data  // Products for the given category
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({
      errCode: 0,
      message: "An error occurred while loading the products.",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { masp, productName, productPrice, productDescription, productGroup, oldImage } = req.body;

    // Lấy tên ảnh mới, nếu không có ảnh mới thì giữ ảnh cũ
    let newImageName = oldImage; // oldImage là tên ảnh cũ

    // Nếu có ảnh mới
    if (req.file) {
      newImageName = req.file.filename; // Lấy tên ảnh mới từ multer
    }

    // Nếu có ảnh cũ và ảnh mới được thay thế, xóa ảnh cũ
    if (oldImage && newImageName !== oldImage) {
      const oldImagePath = path.resolve('images/product', oldImage);
      fs.unlinkSync(oldImagePath); // Xóa ảnh cũ
    }

    // Cập nhật thông tin sản phẩm
    const updatedProduct = await productModel.updateProduct(masp, productName, productPrice, newImageName, productDescription, productGroup);

    // Kiểm tra nếu cập nhật thành công
    if (updatedProduct) {
      // Điều hướng lại trang hiển thị chi tiết sản phẩm sau khi cập nhật
      res.redirect(`/product/${masp}`);
    } else {
      res.status(400).send('Failed to update product');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal server error');
  }
};

export default {
    deltaProduct,
    createProduct,
    insertProduct,
    getAllProduct,
    deleteProduct,
    getAllSanPhamBynhom,
    getSanPhamBynhom,
    updateProduct
};