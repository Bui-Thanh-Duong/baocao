import express from "express";
import userModel from '../Models/categoryModel'  // Import model để xử lý với CSDL hoặc logic nghiệp vụ

const getAllCategory = async (req, res) => {
  try {
    let categoryList = await userModel.getAllNhom(); // Gọi model để lấy danh sách người dùng
    res.render('home', {
      data: {
        title: 'List Category',
        page: 'Category',
        rows: categoryList // Truyền dữ liệu vào view
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Categorys.");
  }
}
// API
// API
const getAllNhom = async (req, res) => {
  let categorys = await userModel.getAllNhom();
  return res.status(200).json({
    errCode: 1,
    message: "Success",
    categorys: categorys
  })
}

const createloai = async (req, res) => {
  return res.render('home', {
    data: {
      title: 'List Category',
      // 
      page: 'insertcategory',
    }
  })
}
const insertloai = async (req, res) => {
  try {
    const { tenloai } = req.body;
    if (await userModel.insertNhom(tenloai)) {
      res.redirect("/insertcategory");
    }
  } catch (error) {
    console.error('Lỗi trong quá trình thêm loại:', error);
    res.status(500).send('Lỗi khi thêm loại');
  }
}
const getAllnhom = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
    const limit = 5; // Số lượng mục trên mỗi trang
    const offset = (page - 1) * limit; // Tính vị trí bắt đầu lấy dữ liệu
    // Lấy số lượng người dùng tổng cộng
    const totalUsers = await userModel.countNhom(); 
    const totalPages = Math.ceil(totalUsers / limit);
    // Lấy danh sách người dùng theo phân trang
    let Listcategory = await userModel.getAllNhom(offset, limit);
        res.render('home', {
      data: {
        title: 'List Category',
        page: 'listCategory',
        rows: Listcategory,
        currentPage: page,
        totalPages: totalPages
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi tải dữ liệu.");
  }
};
const deleteNhom = async (req, res) => {
  try{
    const { idnhom } = req.body;
    await userModel.deleteNhomById(idnhom)
    res.redirect('/listcategory');
  }catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi thực hiện câu truy vấn.");
  }
}

const editCategory = async (req, res) => {
  const { idnhom } = req.params;
  const category = await userModel.getCategorybyid(idnhom)
  return res.render('home', {
    data: {
      title: 'List Category',
      page: 'editCategory',
      category: category
    }
  })
}


const updateCategory = async (req, res) => {
  try{
    const { idnhom, ten } = req.body;
    await userModel.updateCategory(idnhom,ten);
    res.redirect(`/editCategory/${idnhom}`);
  }catch (error) {
    console.error(error);
    res.status(500).send("Lỗi khi thực hiện câu truy vấn.");
  }
}

export default { getAllNhom, getAllCategory, createloai, insertloai, getAllnhom, deleteNhom, editCategory, updateCategory};