import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../css/product/deltaproduct.module.css';

const ProductDetail = () => {
  const { id } = useParams();  // Retrieves the 'id' parameter from the URL
  const [deltaProduct, setDeltaProduct] = useState(null);  // State to store product details
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error messages
  const navigate = useNavigate();  // Hook to navigate programmatically
  
  useEffect(() => {
    // Fetch the product details when the component is mounted
    axios.get(`http://localhost:3000/api/deltaproduct/${id}`)
      .then(response => {
        if (response.data.errCode === 1) {
          setDeltaProduct(response.data.deltaProduct); // Set product details if success
        } else {
          setError(response.data.message); // Show error if failure
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          navigate('/404'); // Navigate to 404 if server error
        } else {
          setError("Có lỗi xảy ra khi tải sản phẩm"); // Show error message
        }
      })
      .finally(() => {
        setLoading(false);  // Set loading to false when the request finishes
      });
  }, [id, navigate]);

  const showPaymentForm = () => {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm.style.display === 'block') {
      paymentForm.style.display = 'none';
    } else {
      paymentForm.style.display = 'block';
    }
  };

  const setupCloseButton = () => {
    const closeFormBtn = document.getElementById('closeFormBtn');
    const paymentForm = document.getElementById('paymentForm');

    closeFormBtn.removeEventListener('click', handleCloseButtonClick);

    closeFormBtn.addEventListener('click', handleCloseButtonClick);

    function handleCloseButtonClick() {
      paymentForm.style.display = 'none';
    }
  };

  if (loading) {
    return <div>Đang tải sản phẩm...</div>; // Loading message
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>; // Error message
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
              <em>{new Intl.NumberFormat().format(deltaProduct.gia * 1.2)}Đ</em> 
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