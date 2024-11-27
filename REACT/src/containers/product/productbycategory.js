import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styles from '../css/product/productbycategory.module.css';

const Productbycategory = () => {
  const { id } = useParams();
  const [productByCategory, setProductByCategory] = useState([]);
  const [tenNhom, setTenNhom] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/getallproductbycategory/${id}?page_number=${pageNumber}`)
      .then(response => {
        if (response.data.errCode === 1) {
          setProductByCategory(response.data.productbycategory);
          setTotalPages(response.data.totalPages);
          if (response.data.productbycategory.length > 0) {
            setTenNhom(response.data.productbycategory[0].nhom.ten);
          }
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => {
        setError("Có lỗi xảy ra khi tải sản phẩm");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, pageNumber]);

  if (loading) {
    return <div className={styles.loadingMessage}>Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.productContainer}>
    <div className={styles.productListTitle}>
      {tenNhom ? `SẢN PHẨM CỦA NHÓM: ${tenNhom}` : "SẢN PHẨM THEO LOẠI"}
    </div>
    <div className="row justify-content-start">
      {productByCategory.length > 0 ? (
        productByCategory.map(product => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.idsanpham}>
            <div className={styles.productListProduct}>
              <Link to={`/deltaproduct/${product.masp}`} className={styles.productListProductLink}>
                <div>
                  <img className={styles.productImg} src={`http://localhost:3000/images/product/${product.hinhanh}`} alt={product.ten} />
                  <div className={styles.productImgOverlay}>
                    <div className={styles.productHoverIcons}>
                      <i className="SearchIcon fas fa-search"></i>
                    </div>
                  </div>
  
                  <h2 className={styles.productListProductLinkH2}>{product.ten}</h2>
                  <div className={styles.productPrice}>
                    <span className={styles.originalPrice}>
                      {new Intl.NumberFormat().format(product.gia * 1.2)}Đ
                    </span>
                    <span className={styles.discountPrice}>
                      {new Intl.NumberFormat().format(product.gia)}Đ
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className={styles.noProductsMessage}>Hiện tại không có sản phẩm nào trong danh mục này.</h1>
      )}
    </div>
  
    {productByCategory.length > 0 && totalPages > 1 && (
      <div className={styles.productListPagination}>
        {/* Render pagination links */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPageNumber(index + 1)}
            className={`${styles.productListPaginationLink} ${pageNumber === index + 1 ? styles.active : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default Productbycategory;
