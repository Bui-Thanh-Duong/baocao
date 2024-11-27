import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/footer/footer.module.css'; // Đảm bảo rằng bạn đã tạo và thêm CSS phù hợp

const Footer = () => {
  return (
    <footer className={`${styles['footer-container']} mt-3`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className={styles['footer-logo']}>Natural Lipstick</h5>
            <p className={styles['footer-info']}>
              Chúng tôi cung cấp các dịch vụ chất lượng cao và đội ngũ nhân viên chuyên nghiệp.
            </p>
            <div className={styles['footer-social']}>
              <Link to="#" className={styles['social-icon']}><i className="fab fa-facebook"></i></Link>
              <Link to="#" className={styles['social-icon']}><i className="fab fa-twitter"></i></Link>
              <Link to="#" className={styles['social-icon']}><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className={styles['footer-heading']}>Dịch Vụ Có Liên Quan</h5>
            <ul className={styles['footer-nav']}>
              <li><Link to="#" className={styles['footer-link']}>Tư vấn</Link></li>
              <li><Link to="#" className={styles['footer-link']}>Về chúng tôi</Link></li>
              <li><Link to="#" className={styles['footer-link']}>Khách hàng thân thiết</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className={styles['footer-heading']}>Thông tin Liên Quan</h5>
            <ul className={styles['footer-nav']}>
              <li><Link to="#" className={styles['footer-link']}>Chính sách bảo hành</Link></li>
              <li><Link to="#" className={styles['footer-link']}>Hướng dẫn sử dụng</Link></li>
              <li><Link to="#" className={styles['footer-link']}>Hướng dẫn bảo quản</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className={styles['footer-heading']}>Liên Hệ</h5>
            <p className={styles['footer-info']}>Địa chỉ: 256 Nguyễn Văn Cừ</p>
            <p className={styles['footer-info']}>Email: NaturalLiptick@gmail.com</p>
            <p className={styles['footer-info']}>Điện thoại: 0123 456 789</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
