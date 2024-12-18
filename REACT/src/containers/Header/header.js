import React, { useState, useContext } from 'react';
import styles from '../css/header/header.module.css';
import { Link } from 'react-router-dom';
import { Context } from './Context';
import CategoryDropdown from './CategoryDropdown';
import stylesmenu from '../css/header/menu.module.css';

const Header = ({ categorys = []}) => {
  const [searchInput, setSearchInput] = useState('');
  const { user, logoutContext } = useContext(Context);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Tìm kiếm: ${searchInput}`);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout function triggered!");
  
    // Xóa thông tin trong localStorage
    localStorage.removeItem('user');
    
    // Gọi logoutContext để cập nhật trạng thái người dùng trong context
    logoutContext();
  };
  
  

  return (
    <div className={`${styles.headerContainer}`}>
      <nav className={`${styles.headerColor} navbar navbar-expand-lg`}>
        <div className="mr-5 px-5">
          <Link to="/" className={`${styles.logo}`}>
            <h1>Natural Lipstick</h1>
          </Link>
        </div>
        <button
          className={`${styles.btnToggler} navbar-toggler`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className={`nav-item dropdown ${stylesmenu['menu-item']}`}>
            <Link
              className={`nav-link ${stylesmenu['menu-link']} active dropdown-toggle`}
              to="#"
              id="navbarDropdown1"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-list"></i> Danh mục khác
            </Link>
            <CategoryDropdown categorys={categorys} />

          </li>
            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  id="searchInput"
                  className={`${styles.searchInput} form-control me-2`}
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className={`${styles.searchBtn} btn btn-outline-light`} type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className={`${styles.cartMargin} nav-item`}>
              <button className={`${styles.cartBtn} btn btn-outline-light`}>
                <i className="fas fa-shopping-cart"></i> Giỏ hàng
              </button>
            </li>
            {user && user.quyen === 1 && (
            <li className={`nav-item ${stylesmenu['menu-item']}`}>
              <Link className={`nav-link ${stylesmenu['menu-link']} active`} to="/admin">
                Quay lại trang Quản trị
              </Link>
            </li>
          )}
<li className="nav-item">
  {user?.auth ? (
    <div className={styles.headerInfor}>
      <div className={styles.headerHiUser}><span>Xin chào, {user.username}</span></div>
      <span
        className={styles.logoutBtn}
        onClick={handleLogout}
      >
        <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
      </span>
    </div>
  ) : (
    <Link to="/login" className={`${styles.loginBtn} btn btn-outline-light`}>
      <i className="fas fa-sign-in-alt"></i> Đăng nhập
    </Link>
  )}
</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Header;