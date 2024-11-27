import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../css/userInfor.module.css'; // Import CSS module
import { Context } from '../Header/Context'; // Import context để lấy thông tin user

const UserInfo = () => {
    const { user } = useContext(Context); // Lấy user từ context
    const { username } = useParams(); // Lấy username từ URL
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null); // Để lưu thông báo lỗi
    const navigate = useNavigate(); // Khởi tạo navigate
    console.log(user)
    useEffect(() => {
        if (!user.auth) { // Kiểm tra nếu người dùng chưa đăng nhập
            navigate("/"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
        } else {
            // Yêu cầu API với template literal để bao gồm username
            axios.get(`http://localhost:3000/api/v1/deltauserbyusername/${username}`, { withCredentials: true })
                .then((response) => {
                    setUserData(response.data.deltauser);
                    setError(null); // Reset lỗi khi tải thành công
                })
                .catch((err) => {
                    console.error(err);
                    setError('Không thể tải dữ liệu người dùng'); // Hiển thị thông báo lỗi
                });
        }
    }, [username, user.auth, navigate]); // Kiểm tra trạng thái đăng nhập và username thay đổi

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    // Nếu chưa có dữ liệu người dùng, hiển thị thông báo "Đang tải"
    if (!userData) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Thông tin người dùng</h2>
            <p className={styles.welcomeMessage}>Chào mừng, {userData.username}</p> {/* Hiển thị username */}
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Tên đăng nhập:</td>
                        <td className={styles.td}>{userData.username}</td>
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Họ và tên:</td>
                        <td className={styles.td}>{userData.fullname}</td>
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Địa chỉ:</td>
                        <td className={styles.td}>{userData.address}</td>
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Giới tính:</td>
                        <td className={styles.td}>{userData.sex}</td>
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Email:</td>
                        <td className={styles.td}>{userData.email}</td>
                    </tr>
                    <tr className={styles.tableRowHover}>
                        <td className={styles.td}>Vai trò:</td>
                        <td className={styles.td}>{userData.role}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default UserInfo;
