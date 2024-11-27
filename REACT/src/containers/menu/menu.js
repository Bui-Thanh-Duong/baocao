import React from 'react';
import { Link } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown'; // Import component danh mục
import styles from '../css/menu/menu.module.css'; // Đảm bảo rằng bạn có các style thích hợp

const Menu = ({ categorys, user }) => {
  return (
    <div className={`container-fluid bg-dark ${styles['menu-container']}`}>
      <nav className="menu-navbar-container navbar-container navbar navbar-expand">
        <ul className={`navbar-nav ${styles['menu-nav']}`}>
          <li className={`nav-item ${styles['menu-item']}`}>
            <Link className={`nav-link ${styles['menu-link']} active`} to="/">
              <i className="fas fa-home"></i> Trang chủ
            </Link>
          </li>
          
          <li className={`nav-item dropdown ${styles['menu-item']}`}>
            <Link
              className={`nav-link ${styles['menu-link']} active dropdown-toggle`}
              to="#"
              id="navbarDropdown1"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-list"></i> Danh mục khác
            </Link>
            <CategoryDropdown categorys={categorys} /> {/* Thay thế bằng component CategoryDropdown */}
          </li>
          {user && user.quyen === 1 && (
            <li className={`nav-item ${styles['menu-item']}`}>
              <Link className={`nav-link ${styles['menu-link']} active`} to="/admin">
                Quay lại trang Quản trị
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
