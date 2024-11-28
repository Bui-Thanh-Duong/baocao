import categoryModel from '../Models/categoryModel';

const getAllCategory = async (req, res) => {
    const categoryList = await categoryModel.getAllNhom();
    res.render('home', {
      data: {
        title: 'List Category',
        page: 'Category',
        rows: categoryList
      }
    });
};

const getAllNhom = async (req, res) => {
  const categories = await categoryModel.getAllNhom();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    categories: categories
  });
};

const insertCategory = async (req, res) => {
    const { tenloai } = req.body;
    if (await categoryModel.insertNhom(tenloai)) {
      res.redirect("/insertcategory");
    }
};

const getAllCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const totalCategories = await categoryModel.countNhom();
    const totalPages = Math.ceil(totalCategories / limit);
    const categoryList = await categoryModel.getAllNhom((page - 1) * limit, limit);
    
    res.render('home', {
      data: {
        title: 'List Categories',
        page: 'listCategories',
        rows: categoryList,
        currentPage: page,
        totalPages: totalPages
      }
    });
};

const deleteCategory = async (req, res) => {
    const { idnhom } = req.body;
    if (!idnhom) return res.status(400).send("Invalid category ID.");
    await categoryModel.deleteNhomById(idnhom);
    res.redirect('/listcategory');
};

const editCategory = async (req, res) => {
  const { idnhom } = req.params;
  const category = await categoryModel.getCategoryById(idnhom);
  return res.render('home', {
    data: {
      title: 'Edit Category',
      page: 'editCategory',
      category: category
    }
  });
};

const updateCategory = async (req, res) => {
    const { idnhom, ten } = req.body;
    await categoryModel.updateCategory(idnhom, ten);
    res.redirect(`/editCategory/${idnhom}`);
};

export default { getAllNhom, getAllCategory, insertCategory, deleteCategory, getAllCategories, editCategory, updateCategory };
