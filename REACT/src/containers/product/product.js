import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/product/product.module.css';

const ProductList = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [sonthoi, setsonthoi] = useState([]);
  const [sonduong, setsonduong] = useState([]);
  const [sonbong, setsonbong] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/newproduct')
      .then(response => setNewProducts(response.data.products || []))
      .catch(error => console.error('Error fetching new products:', error));
  
    axios.get('http://localhost:3000/api/v1/getproductbycategory/1')
      .then(response => setsonthoi(response.data.productbycategory || []))
      .catch(error => console.error('Error fetching phone products:', error));
  
    axios.get('http://localhost:3000/api/v1/getproductbycategory/2')
      .then(response => setsonduong(response.data.productbycategory || []))
      .catch(error => console.error('Error fetching laptop products:', error));
  
    axios.get('http://localhost:3000/api/v1/getproductbycategory/3')
      .then(response => setsonbong(response.data.productbycategory || []))
      .catch(error => console.error('Error fetching accessory products:', error));
  }, []);
  
  const renderProduct = (products) => {
    if (!products.length) {
      return <h1>Không có sản phẩm nào</h1>;
    }
    return products.map((product) => (
      <div className={styles.productProduct} key={product.masp}>
        <Link to={`/deltaproduct/${product.masp}`}>
          <div>
            <img className={styles.productImg} src={`http://localhost:3000/images/product/${product.hinhanh}`} alt={product.ten} />
            <div className={styles.productImgOverlay}>
              <div className={styles.productHoverIcons}>
                <i className="fas fa-search"></i>
              </div>
            </div>
            <h2>{product.ten}</h2>
            <div className={styles.productPrice}>
              <span className={styles.originalPrice}>{new Intl.NumberFormat().format(product.gia * 1.2)}Đ</span>
              <span className={styles.discountPrice}>{new Intl.NumberFormat().format(product.gia)}</span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      {/* SẢN PHẨM MỚI */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>SẢN PHẨM MỚI</div>
        <div className={styles.productTagProduct}>
          {newProducts.length > 0 ? renderProduct(newProducts) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&new_products&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>

      {/* Son Thỏi */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>Son Thỏi</div>
        <div className={styles.productTagProduct}>
          {sonthoi.length > 0 ? renderProduct(sonthoi) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&category_id=1&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>

      {/* Son Dưỡng */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>Son Dưỡng</div>
        <div className={styles.productTagProduct}>
          {sonduong.length > 0 ? renderProduct(sonduong) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&category_id=2&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>

      {/* Son Bóng */}
      <div className={styles.productContainer}>
        <div className={styles.productTitle}>Son Bóng</div>
        <div className={styles.productTagProduct}>
          {sonbong.length > 0 ? renderProduct(sonbong) : <p>Loading...</p>}
        </div>
        <div className={styles.productMore}>
          <Link to="?controller=contentbycategory&action=ProductList&category_id=3&page=1">
            <div className={styles.moreButton}>
              <i className="fas fa-arrow-right"></i>
              Xem thêm
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
