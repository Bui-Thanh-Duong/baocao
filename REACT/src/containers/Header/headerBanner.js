import React, { useEffect, useState } from 'react';

const HeaderBanner = () => {
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    // Trực tiếp lấy URL từ API mà không cần chuyển đổi blob
    const imageUrl = 'http://localhost:3000/images/bannerf.jpg';
    setBannerImage(imageUrl); // Cập nhật state với URL ảnh
  }, []);

  return (
    <div className="header-topBanner">
      {bannerImage ? (
        <img src={bannerImage} alt="Banner" className="banner-image" />
      ) : (
        <p>Đang tải ảnh...</p> // Hiển thị khi ảnh chưa được tải
      )}
    </div>
  );
};

export default HeaderBanner;
