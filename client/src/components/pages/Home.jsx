import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AthleticHubSlider from "./Slider/Slider";
import Featured from "./Featured";
import {
  FaArrowsAltV,
  FaDashcube,
  FaPersonBooth,
  FaRunning,
  FaSwimmer,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Button } from "../ui/button";

const sports = [
  { name: "Sprinting", icon: <FaRunning />, count: 14 },
  { name: "Swimming", icon: <FaSwimmer />, count: 10 },
  { name: "Long Jump", icon: <FaArrowsAltV />, count: 6 },
  { name: "High Jump", icon: <FaPersonBooth />, count: 5 },
  { name: "Hurdle Race", icon: <FaDashcube />, count: 8 },
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | AthleticHub</title>
      </Helmet>

      <div className="relative min-h-screen bg-base-100">
        <section className="mb-5">
          <AthleticHubSlider />
        </section>
        <section className="mb-5">
          <Featured />
        </section>
        <section className="py-16 bg-muted text-center rounded-xl">
          <h2 className="text-3xl font-bold text-primary mb-8 animate-pulse">
            🏅 Popular Sports
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {sports.map((sport, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-base-200 rounded-xl p-5 shadow hover:shadow-xl transition"
              >
                <div className="text-5xl text-primary mb-2">{sport.icon}</div>
                <h3 className="text-lg font-semibold text-secondary-foreground mb-1">
                  {sport.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {sport.count}+ events
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-primary mb-8"
          >
            🏆 Athlete Hub Success Stories
          </motion.h2>

          <div className="space-y-12  max-w-4xl mx-auto">
            {[
              {
                quote:
                  "Competing in local meets through AthleticHub helped me qualify for regionals. The process was smooth, and I met amazing athletes along the way.",
                name: "— Ryan M., California Sprinter",
              },
              {
                quote:
                  "I hosted my first swimming gala on AthleticHub and got 50+ registrations in a week. It’s the go-to platform for sports lovers.",
                name: "— Emma L., Event Organizer, New Jersey",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-muted p-6 rounded-xl shadow-md"
              >
                <p className="text-lg text-accent-foreground font-semibold italic mb-4">
                  “{testimonial.quote}”
                </p>
                <span className="text-sm text-gray-500">
                  {testimonial.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
