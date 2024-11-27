import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, account } from './userService'; // Import hàm login từ userService
import { Context } from './Context'; // Import context
import styles from '../css/header/login.module.css'; // Import CSS Module
import { Link } from 'react-router-dom';

const Login = () => {
  const [stateInput, setStateInput] = useState({});  // Quản lý trạng thái input
  const { loginContext } = useContext(Context);  // Lấy user từ context và loginContext
  const [errorMessage, setErrorMessage] = useState('');  // Quản lý thông báo lỗi
  const navigate = useNavigate();  // Hook điều hướng

  // Hàm xử lý đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const items = await login(stateInput.user, stateInput.pass); // Gọi hàm login từ userService
      if (items.data.err === 0) {
        setErrorMessage(items.data.message);  // Hiển thị thông báo lỗi nếu có
      } else {
        // Sau khi đăng nhập thành công, gọi API account để lấy thông tin người dùng
        const userResponse = await account(); // Gọi API getuser để lấy thông tin người dùng
        console.log(userResponse.data.message)
        loginContext(userResponse.data.data.user);  // Lưu username vào context
        navigate('/')
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Đăng nhập không thành công. Vui lòng thử lại!');  // Lỗi hiển thị thông thường
    }
  };

  return (
    <div className={styles.container}>
      <div className="d-flex navbar navbar-expand-lg navbar-light bg-light">
        <img className={styles.hinhdau} src="http://localhost:3000/images/TGDD-540x270 2.png" alt="" />

        <form className="form-dn mx-auto" method="post" onSubmit={handleLogin}>
          <h1 className={styles.textCenter}>Login</h1>

          {/* Tên đăng nhập */}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${styles.customInput}`}
              id="username"
              name="login_user"
              placeholder="Tên đăng nhập"
              onChange={(e) => setStateInput({ ...stateInput, user: e.target.value })}
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${styles.customInput}`}
              id="password"
              name="login_pass"
              placeholder="Mật khẩu"
              onChange={(e) => setStateInput({ ...stateInput, pass: e.target.value })}
            />
          </div>

          {/* Thông báo lỗi */}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          {/* Nút Đăng Nhập */}
          <div className={styles.thanhlogin}>
            <button type="submit" className={`btn btn-primary text-dark ${styles.customInput}`} name="Login-btn">
              Login
            </button>
          </div>

          {/* Liên kết Đăng Ký */}
          <div className={styles.namngangdangki}>
            <span> Bạn chưa có tài khoản? <Link to="/registry" className="text-decoration">Đăng ký</Link></span>
          </div>
        </form>

      </div>
      <div className="navbar-expand-lg navbar-light bg-light">
        <img className={styles.hinhcuoi} src="http://localhost:3000/images/Vectors.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
