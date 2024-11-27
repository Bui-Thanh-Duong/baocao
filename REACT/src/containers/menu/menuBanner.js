import React, { useEffect, useState } from 'react';
import Styles from "../css/menu/menuBanner.module.css"; // Ensure you are importing correctly

function Slider() {
  const [imagesSlider1, setImagesSlider1] = useState([]);
  const [imagesSlider2, setImagesSlider2] = useState([]);
  const [imageSlider3, setImageSlider3] = useState('');
  const [slideIndex1, setSlideIndex1] = useState(0);
  const [slideIndex2, setSlideIndex2] = useState(0);

  useEffect(() => {
    // Define the image URLs directly
    const imageUrlsSlider1 = [
      'http://localhost:3000/images/slider/sl1.png',
      'http://localhost:3000/images/slider/sl2.png',
      'http://localhost:3000/images/slider/sl3.png',
      'http://localhost:3000/images/slider/sl4.png',
    ];

    const imageUrlsSlider2 = [
      'http://localhost:3000/images/slider/sl21.webp',
      'http://localhost:3000/images/slider/sl22.webp',
      'http://localhost:3000/images/slider/sl23.webp',
      'http://localhost:3000/images/slider/sl24.webp',
    ];

    const imageSlider3Url = 'http://localhost:3000/images/slider/cntl.jpg';

    // Set images to state
    setImagesSlider1(imageUrlsSlider1);
    setImagesSlider2(imageUrlsSlider2);
    setImageSlider3(imageSlider3Url);

  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex1((prevIndex) => (prevIndex + 1) % imagesSlider1.length);
      setSlideIndex2((prevIndex) => (prevIndex + 1) % imagesSlider2.length);
    }, 2500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [imagesSlider1.length, imagesSlider2.length]);

  const plusSlides = (n, sliderType) => {
    if (sliderType === 'sliderMySlides1') {
      setSlideIndex1((prevIndex) => (prevIndex + n + imagesSlider1.length) % imagesSlider1.length);
    } else {
      setSlideIndex2((prevIndex) => (prevIndex + n + imagesSlider2.length) % imagesSlider2.length);
    }
  };

  return (
    <div className={Styles.sliderContainer}>
      {/* Render slider 1 */}
      <div className={Styles.sliderContent1}>
        <div className={Styles.slider1}>
          {imagesSlider1.map((src, index) => (
            <div
              className={`${Styles.sliderMySlides1} ${index === slideIndex1 ? Styles.active : ''}`}
              key={index}
            >
              <img src={src} alt={`slide ${index + 1}`} />
              <button className={Styles.prev} onClick={() => plusSlides(-1, 'sliderMySlides1')}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className={Styles.next} onClick={() => plusSlides(1, 'sliderMySlides1')}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Render slider 2 */}
      <div className={Styles.sliderContent2}>
        <div className={Styles.slider2}>
          {imagesSlider2.map((src, index) => (
            <div
              className={`${Styles.sliderMySlides2} ${index === slideIndex2 ? Styles.active : ''}`}
              key={index}
            >
              <img src={src} alt={`intel slide ${index + 1}`} />
              <button className={Styles.prev} onClick={() => plusSlides(-1, 'sliderMySlides2')}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className={Styles.next} onClick={() => plusSlides(1, 'sliderMySlides2')}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Render slider 3 */}
        <div className={Styles.slider3}>
          <img src={imageSlider3} alt="cntl.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
