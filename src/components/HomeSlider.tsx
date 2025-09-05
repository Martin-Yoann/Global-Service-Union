"use client";

import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        text: "We are a duly established non-profit organization under Section 501(c)(3) of the U.S. Internal Revenue Code, dedicated to advancing international business education, philanthropic initiatives, and cross-cultural exchange. Through conferences, seminars, and a comprehensive online resource library, we empower professionals to grasp industry trends, enhance management skills, and build a global professional network.",
      },
    ],
    image: "/banner2.png",
  },
  {
    title: [
      {
        type: "b",
        text: "As an open platform connecting global business partners, with no subordination among members, we encourage the free exchange of needs, integration of resources, and establishment of collaborations. The organization's mission is to facilitate efficient and equitable global business collaboration.In community communication, please refrain from openly discussing trade secrets.The responsibility related to cooperation shall be borne by the members themselves.",
      },
    ],
    image: "/banner3.png",
  },
];

const textStyles: Record<SlideContent["type"], string> = {
  h1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold",
  b: "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold",
  p: "text-sm sm:text-base md:text-lg lg:text-xl font-normal max-w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] mx-auto text-center",
};

const PrevArrow = ({ onClick }: any) => (
  <div
    className="absolute top-1/2 -translate-y-1/2 left-4 z-20 cursor-pointer"
    onClick={onClick}
  >
    <div className="w-10 h-10 border-l border-t border-white transform -rotate-45 hover:border-indigo-400 transition-all"></div>
  </div>
);

const NextArrow = ({ onClick }: any) => (
  <div
    className="absolute top-1/2 -translate-y-1/2 right-4 z-20 cursor-pointer"
    onClick={onClick}
  >
    <div className="w-10 h-10 border-r border-t border-white transform rotate-45 hover:border-indigo-400 transition-all"></div>
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
    <div className="overflow-x-hidden m-0 p-0">
      <Slider {...sliderSettings} className="m-0 p-0">
        {slides.map((slide, idx) => (
          <div key={idx} className="relative h-screen w-full m-0 p-0">
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
                className="text-white text-center leading-relaxed md:leading-loose max-w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] space-y-3"
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
