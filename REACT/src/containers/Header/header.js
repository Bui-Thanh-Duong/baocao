import React, { useState, useContext } from 'react';
import styles from '../css/header/header.module.css';
import HeaderBanner from './headerBanner';
import { Link } from 'react-router-dom';
import { Context } from './Context'; // Import context để lấy thông tin user
import { logout } from './userService';


const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const { user, logoutContext } = useContext(Context);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Tìm kiếm: ${searchInput}`);
  };

  const handleLogout = async (e) => {
    e.preventDefault();  // Prevent default action
    console.log("Logout function triggered!"); // Check if it is being called
    try {
      await logout();  // Gọi API logout
      logoutContext();  // Cập nhật context và localStorage sau khi logout thành công
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={`${styles.headerContainer}`}>
      <HeaderBanner />
      <nav className={`${styles.headerColor} navbar navbar-expand-lg`}>
        <div className="mr-5 px-5">
          <Link to="/" className={`${styles.logo}`}>
            <h1> Welcome Natural Lipstick</h1>
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
            <li className="nav-item">
              {user?.auth ? (
                <div className={styles.headerInfor}>
                  <div className={styles.headerHiUser}><span>Xin chào, {user.username}</span></div>
                  <span
                    className={styles.logoutBtn}
                    onClick={handleLogout}  // Pass the function reference
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
