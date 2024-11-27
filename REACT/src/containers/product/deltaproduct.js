import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import styles from '../css/product/deltaproduct.module.css'; // Import CSS module

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [deltaProduct, setDeltaProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khởi tạo navigate để chuyển hướng
  
  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết sản phẩm theo id
    axios.get(`http://localhost:3000/api/v1/deltaproduct/${id}`)
      .then(response => {
        if (response.data.errCode === 1) {
          setDeltaProduct(response.data.deltaProduct); // Lấy thông tin chi tiết sản phẩm
        } else {
          setError(response.data.message); // Nếu có lỗi từ API
        }
      })
      .catch((error) => {
        // Nếu có lỗi server (500), chuyển hướng tới trang 404
        if (error.response && error.response.status === 500) {
          navigate('/404'); // Điều hướng đến trang 404
        } else {
          setError("Có lỗi xảy ra khi tải sản phẩm"); // Lỗi kết nối hoặc phản hồi từ API
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  const showPaymentForm = () => {
    // Select the payment form
    const paymentForm = document.getElementById('paymentForm');
    // Kiểm tra xem $_SESSION['user_data'] có tồn tại hay không
    // Nếu tồn tại, hiển thị form thanh toán nếu đang ẩn, ẩn nếu đang hiển thị
    if (paymentForm.style.display === 'block') {
      paymentForm.style.display = 'none'; // Ẩn form nếu đã hiển thị
    } else {
      paymentForm.style.display = 'block'; // Hiển thị form nếu đang ẩn
    }
  };

  const setupCloseButton = () => {
    // Lấy nút tắt và form
    const closeFormBtn = document.getElementById('closeFormBtn');
    const paymentForm = document.getElementById('paymentForm');

    // Xóa sự kiện click trước khi thêm lại
    closeFormBtn.removeEventListener('click', handleCloseButtonClick);

    // Thêm sự kiện click cho nút tắt
    closeFormBtn.addEventListener('click', handleCloseButtonClick);

    // Định nghĩa hàm xử lý sự kiện click của nút tắt
    function handleCloseButtonClick() {
      paymentForm.style.display = 'none'; // Ẩn form khi nhấp vào nút tắt
    }
  };

  if (loading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className={styles.chitietspContainer}>
      <div className={styles.chitietspTittle}>
        {deltaProduct.ten}
      </div>
      <div className={styles.chitietspContent}>
        <div className={styles.chitietspImg}>
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={`http://localhost:3000/images/product/${deltaProduct.hinhanh}`} className="d-block w-100 img-fluid" alt="h1" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chitietspInfor1}>
          <div className={styles.chitietspInfor1a}>
            <h2>
              <b>Giá và khuyến mãi</b><br />
              <strong>{new Intl.NumberFormat().format(deltaProduct.gia)}*</strong> 
              <em>{new Intl.NumberFormat().format(deltaProduct.gia* 1.2)}Đ</em> 
              <i>(-20%)</i>
            </h2>
          </div>
          <div className={styles.chitietspInfor1b}>
            <p>Mô tả sản phẩm: {deltaProduct.mota}</p>
           
            <div className={styles.chitietspGroupbtn}>
              <button onClick={showPaymentForm} className={styles.chitietspBuybtn}>Mua ngay</button>
              <a href="#" className={styles.chitietspAddtocartbtn}>Thêm vào giỏ hàng</a>
            </div>
          </div>
          <div className={styles.chitietspInfor1c}>
            <p>Chi tiết liên hệ Fanpage: Natural Lipstick.vn</p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ProductDetail;
