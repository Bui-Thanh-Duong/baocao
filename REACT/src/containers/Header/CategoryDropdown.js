import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for API requests
import { Link } from 'react-router-dom';  // Import Link từ react-router-dom để thay thế thẻ <a>
import styles from '../css/header/menu.module.css';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API lấy danh sách category
    axios.get('http://localhost:3000/api/v1/category')

    .then(response => {
      if (response.data.errCode === 1) {
        setCategories(response.data.categories); // Đảm bảo API trả đúng dữ liệu
      } else {
        setError('Có lỗi xảy ra khi lấy dữ liệu');
      }
    })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Không thể kết nối với API');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Hiển thị thông báo khi dữ liệu đang được tải hoặc có lỗi
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // Nếu không có danh mục nào
  if (categories.length === 0) {
    return <p>No categories available.</p>;
  }

  // Trả về div bao quanh các thẻ <Link> cho mỗi category
  return (
    <div className={`dropdown-menu ${styles['dropdown-menu']}`} aria-labelledby="navbarDropdown1">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <Link
            key={index}
            to={category?.idnhom ? `productbycategory/${category.idnhom}` : '#'}  // Sử dụng `to` thay vì `href`
            className={`${styles['menu-dropitem']} dropdown-item ${styles.categoryListItem}`} // Thêm class để tùy chỉnh style
          >
            {/* Hiển thị icon nếu có */}
            {category.icon && <i className={category.icon}></i>}
            {category.ten}
          </Link>
        ))
      ) : (
        <p>Danh mục hiện không có sẵn</p>  // Hiển thị thông báo nếu không có danh mục
      )}
    </div>
  );
};

export default CategoryDropdown;