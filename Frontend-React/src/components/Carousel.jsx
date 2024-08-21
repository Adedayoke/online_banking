import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // import the styles

const ImageCarousel = () => {
  return (
    <Carousel interval={5000} stopOnHover={true} showIndicators={false} showStatus={false} showArrows={false} showThumbs={false} autoPlay infiniteLoop>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="Slide 1" />
        <p className="legend">Slide 1</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="Slide 2" />
        <p className="legend">Slide 2</p>
      </div>
      <div>
        <img src="https://via.placeholder.com/600x400" alt="Slide 3" />
        <p className="legend">Slide 3</p>
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
