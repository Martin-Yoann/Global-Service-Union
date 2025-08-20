"use client";

import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type SlideContent = {
  type: "h1" | "h3" | "p" | "b"; // ✅ 新增 h3
  text: string;
};

const slides: { title: SlideContent[]; image: string }[] = [
  {
    title: [
      { type: "h1", text: "Global Business Union" },
      { type: "b", text: "Collaborating Freely, operating Independently" },
      {
        type: "p",
        text: "Global Business Union, it is an open collaboration platform that connects global business partners. Members are free to discuss business needs, connect resources, and seek cooperation. We are committed to building efficient bridges for global business collaboration.",
      },
    ],
    image: "/banner1.png",
  },
  {
    title: [{ type: "h3", text: "Collaborating Freely, Operating Independently." }],
    image: "/banner2.png",
  },
  {
    title: [
      { type: "h3", text: "In community communication, please refrain from openly discussing trade secrets." },
      { type: "h3", text: "The responsibility related to cooperation shall be borne by the members themselves." },
    ],
    image: "/banner3.png",
  },
];

// ✅ 样式映射，统一控制字体大小
const textStyles: Record<SlideContent["type"], string> = {
  h1: "text-[45px] font-bold", // h1 45px
  h3: "text-[30px] font-semibold", // ✅ h3 35px
  b: "text-[24px] font-semibold", // b 24px
  p: "text-[18px] font-normal max-w-[50%] mx-auto text-center"

};

// 自定义箭头
const PrevArrow = ({ onClick }: any) => (
  <div
    className="absolute top-1/2 -translate-y-1/2 left-4 z-20 text-white bg-black/50 p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition"
    onClick={onClick}
  >
    <FaChevronLeft />
  </div>
);

const NextArrow = ({ onClick }: any) => (
  <div
    className="absolute top-1/2 -translate-y-1/2 right-4 z-20 text-white bg-black/50 p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition"
    onClick={onClick}
  >
    <FaChevronRight />
  </div>
);

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  accessibility: true,
  focusOnSelect: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

export default function HomeSlider() {
  return (
    <div className="overflow-x-hidden">
      <Slider {...sliderSettings}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative h-[100dvh] md:h-[800px] max-h-screen"
          >
            <Image
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white
                text-center
                leading-relaxed md:leading-loose
                max-w-3/4
                space-y-4
                "
              >
                {slide.title.map((line, i) => {
                  // ✅ 根据 type 决定标签类型
                  const Tag =
                    line.type === "h1"
                      ? "h1"
                      : line.type === "h3"
                      ? "h3"
                      : "p"; // b 也用 p 标签
                  return (
                    <Tag key={i} className={textStyles[line.type]}>
                      {line.text}
                    </Tag>
                  );
                })}
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
