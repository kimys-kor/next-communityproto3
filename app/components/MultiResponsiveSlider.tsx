"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface ResponsiveSliderProps {
  images: string[];
}

const images = [
  "/images/11.PNG",
  "/images/22.PNG",
  "/images/33.PNG",
  "/images/44.PNG",
];

const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "30%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        background: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        borderRadius: "50%",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        background: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        borderRadius: "50%",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

const MultiResponsiveSlider: React.FC<ResponsiveSliderProps> = ({ images }) => {
  const settings = {
    variableWidth: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // when the screen size is <= 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // when the screen size is <= 640px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto relative bg-white">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <Image
              className="rounded-md"
              src={image}
              width={200}
              height={190}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MultiResponsiveSlider;
