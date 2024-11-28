import productModel from '../Models/productModel';

const deltaProduct = async (req, res) => {
      const product = await productModel.getSanPhamById(req.params.id);
      res.json({
          errCode: 1,
          message: 'Success',
          deltaProduct: product
      });
};

const createProduct = async (req, res) => {
        const categories = await productModel.getAllCategories();
        res.render('home', {
            data: {
                title: 'Create New Product',
                page: 'insertProduct',
                categories: categories
            }
        });
};

const insertProduct = async (req, res) => {
        const { productName, productPrice, productDescription, productGroup } = req.body;
        const productImage = req.file ? req.file.filename : null;

        const newProductId = await productModel.insertSanPham(productName, productPrice, productImage, productDescription, productGroup);

        res.redirect('/insertproduct');
};

const getAllProduct = async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const offset = (page - 1) * limit;
        const totalProducts = await productModel.countProduct();
        const totalPages = Math.ceil(totalProducts / limit);
        const productList = await productModel.getNewProduct(offset, limit);

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
        const deleted = await productModel.deleteSanPham(req.params.id);
        if (deleted) {
            res.redirect('/products');
        }
};

const getAllSanPhamBynhom = async (req, res) => {
  const pageNumber = parseInt(req.query.page_number) || 1;
  const pageSize = 10;
  const { sanphams, totalSanPham } = await productModel.getAllSanPhamByCategory(req.params.id, pageNumber, pageSize);

  return res.status(200).json({
    errCode: 1,
    message: "Success",
    productbycategory: sanphams,
    totalPages: Math.ceil(totalSanPham / pageSize)
  });
};

const getSanPhamBynhom = async (req, res) => {
  const categoryId = req.params.id;
    const products = await productModel.getSanPhamByCategory(categoryId);
    res.json({ productbycategory: products });
};

const updateProduct = async (req, res) => {
    const { masp, productName, productPrice, productDescription, productGroup, oldImage } = req.body;

    let newImageName = oldImage;

    if (req.file) {
      newImageName = req.file.filename;
    }

    if (oldImage && newImageName !== oldImage) {
      const oldImagePath = path.resolve('images/product', oldImage);
      fs.unlinkSync(oldImagePath);
    }

    const updatedProduct = await productModel.updateProduct(masp, productName, productPrice, newImageName, productDescription, productGroup);

    if (updatedProduct) {
      res.redirect(`/product/${masp}`);
    }
};

const getNewProducts = async (req, res) => {
    const products = await productModel.getNewProduct(0, 5);
    res.json({ products });
};

export default {
    deltaProduct,
    createProduct,
    insertProduct,
    getAllProduct,
    deleteProduct,
    getAllSanPhamBynhom,
    getSanPhamBynhom,
    updateProduct,
    getNewProducts
};