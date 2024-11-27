import React, { useState } from "react";
import styles from '../css/registry/registry.module.css'; // Import CSS Module
import { Link } from 'react-router-dom'; 
import axios from 'axios';  // Import axios

const Registry = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        phonenumber: '',
        address: '',
        email: '',
        password: '',
        confirm_password: ''  // Đảm bảo trường này có trong state để kiểm tra mật khẩu
    });

    const [errorMessage, setErrorMessage] = useState(null);  // To handle error message
    const [success, setSuccess] = useState(false);  // To track successful registration

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Kiểm tra mật khẩu có trùng khớp không
        if (formData.password !== formData.confirm_password) {
            setErrorMessage("Mật khẩu xác nhận không khớp");
            return;
        }
    
        // Tách confirm_password ra, chỉ gửi dữ liệu cần thiết
        const { confirm_password, ...dataToSend } = formData;
    
        try {
            // Gửi yêu cầu đăng ký người dùng đến server
            const response = await axios.post('http://localhost:3000/api/v1/createnewuser', dataToSend);
    
            // Nếu thành công
            setSuccess(true);
            setErrorMessage(null);
            console.log(response.data.message); // Xem phản hồi thành công từ server
        } catch (error) {
            // Lấy thông tin lỗi từ phản hồi server
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); // Hiển thị message từ server
            } else {
                setErrorMessage("Đã xảy ra lỗi không xác định.");
            }
            setSuccess(false);
            console.error('Error:', error);
        }
    };
    

    return (
        <div>
            <div className="d-flex navbar navbar-expand-lg navbar-light bg-light">
                <img className={styles.dangky} style={{ maxWidth: "80%" }} src="http://localhost:3000/images/dang-ky-ngay 1.png" alt="" />
                <form className="form-dk mx-auto" method="post" onSubmit={handleSubmit}>
                    <h1 className={styles.textCenterDk}>Register</h1>

                    {/* Hiển thị lỗi nếu có */}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}  

                    {success && <div className="alert alert-success">Đăng ký thành công! Bạn có thể đăng nhập.</div>}  {/* Thông báo thành công */}

                    <p className={styles.mothang}>Họ và Tên</p>
                    <div className="name mb-1">
                        <input
                            type="text"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Tên"
                        />
                    </div>

                    <p className={styles.mothang}>Tên đăng nhập</p>
                    <div className="mb-1">
                        <input
                            type="text"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    <p className={styles.mothang}>Số điện thoại</p>
                    <div className="mb-1">
                        <input
                            type="tel"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="phonenumber"
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <p className={styles.mothang}>Địa chỉ</p>
                    <div className="mb-1">
                        <input
                            type="text"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Nhập địa chỉ"
                        />
                    </div>

                    <p className={styles.mothang}>Email</p>
                    <div className="mb-1">
                        <input
                            type="email"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập địa chỉ Email"
                        />
                    </div>

                    <p className={styles.mothang}>Tạo mật khẩu</p>
                    <div className="mb-1">
                        <input
                            type="password"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <p className={styles.mothang}>Xác nhận mật khẩu</p>
                    <div className="mb-1">
                        <input
                            type="password"
                            className={`${styles.formControlDkhai} ${styles.customInputDk}`}
                            id="confirm_password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu"
                        />
                    </div>

                    <div className={styles.xacnhandangky}>
                        <button type="submit" className={`${styles.bth} text-dark-dk`} name="Register-btn" style={{ width: "440px" }}>
                            Register
                        </button>
                    </div>

                    <div className={styles.namngangdangnhap}>
                        <span> Bạn đã có tài khoản? <Link to="/login" className="text-decoration">Đăng nhập</Link></span>
                    </div>
                </form>
            </div>
            <div className={styles.navbarExpandLgDk}>
                <img src="http://localhost:3000/images/Vectors.png" alt="" />
            </div>
        </div>
    );
};

export default Registry;
