"use client";

import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type SlideContent = {
  type: "h1" | "h3" | "p" | "b";
  text: string;
};

const slides: { title: SlideContent[]; image: string }[] = [
  {
    title: [
      { type: "h1", text: "Global Business Association&Education Center" },
      { type: "b", text: "Collaborating Freely, operating Independently" },
    ],
    image: "/banner1.png",
  },
  {
    title: [
      {
        type: "b",
        text: "We are a duly established non-profit organization under Section 501(c)(3)...",
      },
    ],
    image: "/banner2.png",
  },
  {
    title: [
      {
        type: "b",
        text: "As an open platform connecting global business partners...",
      },
    ],
    image: "/banner3.png",
  },
];

const textStyles: Record<SlideContent["type"], string> = {
  h1: "text-[45px] font-bold",
  h3: "text-[30px] font-semibold",
  b: "text-[24px] font-semibold",
  p: "text-[18px] font-normal max-w-[50%] mx-auto text-center",
};

const PrevArrow = ({ onClick }: any) => (
  <div
    className="absolute top-1/2 -translate-y-1/2 left-12 z-20 cursor-pointer group"
    onClick={onClick}
  >
    <div className="w-14 h-14 border-l border-t border-white transform -rotate-45 group-hover:border-indigo-400 transition-all"></div>
  </div>
);

const NextArrow = ({ onClick }: any) => (
  <div
    className="absolute top-1/2 -translate-y-1/2 right-12 z-20 cursor-pointer group"
    onClick={onClick}
  >
    <div className="w-14 h-14 border-r border-t border-white transform rotate-45 group-hover:border-indigo-400 transition-all"></div>
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
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

export default function HomeSlider() {
  return (
    <div className="overflow-x-hidden m-0 p-0"> {/* ✅ 去掉外层 margin/padding */}
      <Slider {...sliderSettings} className="m-0 p-0"> {/* ✅ 去掉 Slider 内边距 */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative h-screen w-full m-0 p-0" // ✅ 直接占满整个屏幕高度
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
                className="text-white text-center leading-relaxed md:leading-loose max-w-[75%] space-y-4" // ✅ 修正 max-w
              >
                {slide.title.map((line, i) => {
                  const Tag =
                    line.type === "h1"
                      ? "h1"
                      : line.type === "h3"
                      ? "h3"
                      : "p";
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
