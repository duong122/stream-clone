import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getActors } from '../../services/actorService'; // Giả sử bạn đã tách service
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ActorList.css'; // custom style nếu muốn

const FamousActorsSlider = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await getActors();
        setActors(response); // Đảm bảo response.data là mảng [{name, image}]
      } catch (error) {
        console.error('Lỗi khi lấy danh sách diễn viên:', error);
      }
    };

    fetchActors();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="famous-actors-slider">
      <h2 className="slider-title">Ngôi sao nổi tiếng</h2>
      <Slider {...settings}>
        {actors.map((actor, index) => (
          <div key={index} className="actor-card">
            <div className="actor-img-wrapper">
              <img src={actor.image} alt={actor.name} className="actor-img" />
            </div>
            <p className="actor-name">{actor.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FamousActorsSlider;
