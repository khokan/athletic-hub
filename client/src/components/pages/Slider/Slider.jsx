import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  FaRunning,
  FaSwimmer,
  FaUsers,
  FaDumbbell,
  FaMedal,
} from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css"; // Create this file for custom styles
import { Button } from "@/components/ui/button";
const AthleticHubSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Upcoming Athletic Events",
      description:
        "Stay ahead of the game—explore the latest competitions and sports events happening near you.",
      icon: <FaRunning className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-yellow-50 to-orange-50",
    },
    {
      id: 2,
      title: "Register Before Spots Fill",
      description:
        "Secure your place in top races, matches, and tournaments. Early registration is now open!",
      icon: <FaSwimmer className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-green-50 to-lime-50",
    },
    {
      id: 3,
      title: "Prepare for the Big Day",
      description:
        "Access training tips, gear checklists, and schedules to perform your best at upcoming events.",
      icon: <FaDumbbell className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
    },
    {
      id: 4,
      title: "Invite Your Squad",
      description:
        "Challenge your teammates or bring your crew—team registrations and group discounts available.",
      icon: <FaUsers className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-indigo-50 to-violet-50",
    },
    {
      id: 5,
      title: "Celebrate Every Victory",
      description:
        "Earn recognition, track your progress, and relive moments from past events through highlights and awards.",
      icon: <FaMedal className="text-5xl mb-4 text-primary" />,
      bgColor: "bg-gradient-to-r from-sky-50 to-cyan-50",
    },
  ];

  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-xl shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-muted h-full w-full p-8 md:p-12 flex flex-col items-center justify-center text-center rounded-xl">
              <div className="mb-6 text-4xl">{slide.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {slide.title}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AthleticHubSlider;
