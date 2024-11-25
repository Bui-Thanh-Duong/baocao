import React, { useEffect, useState } from 'react';

const HeaderBanner = () => {
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const imageUrl = 'http://localhost:3000/images/2.png';
    setBannerImage(imageUrl);
  }, []);

  return (
    <div className="header-topBanner">
      {bannerImage ? (
        <img src={bannerImage} alt="Banner" className="banner-image" />
      ) : (
        <p>Đang tải ảnh...</p>
      )}
    </div>
  );
};

export default HeaderBanner;