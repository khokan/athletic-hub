import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AthleticHubSlider from "./Slider/Slider";
import Featured from "./Featured";
import {
  FaAppleAlt,
  FaArrowsAltV,
  FaDashcube,
  FaDumbbell,
  FaPersonBooth,
  FaRunning,
  FaSwimmer,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router";

const sports = [
  { name: "Sprinting", icon: <FaRunning />, count: 14 },
  { name: "Swimming", icon: <FaSwimmer />, count: 10 },
  { name: "Long Jump", icon: <FaArrowsAltV />, count: 6 },
  { name: "High Jump", icon: <FaPersonBooth />, count: 5 },
  { name: "Hurdle Race", icon: <FaDashcube />, count: 8 },
];

const topOrganizers = [
  { id: 1, name: "Jane Doe", image: "https://i.ibb.co.com/zThyh4Vy/user3.png", eventsCount: 12 },
  { id: 2, name: "Linda Brown", image: "https://i.ibb.co.com/Z16sQb26/user2.png", eventsCount: 9 },
  { id: 3, name: "Alex Jones", image: "https://i.ibb.co.com/VcjGrmST/user4.png", eventsCount: 15 },
  { id: 4, name: "Emma Lee", image: "https://i.ibb.co.com/VcjGrmST/user4.png", eventsCount: 7 },
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
        <div className="px-4 sm:px-6 lg:px-8">
           <section className="py-8 bg-muted text-center rounded-xl  ">
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
        </div>
       
       {/* CTA */}
         <div className="px-4 sm:px-6 lg:px-8 py-8">
      <section className="bg-muted text-white p-8 rounded-xl text-center">
        <h2 className="text-2xl text-muted-foreground font-bold mb-4">Ready to Join the AthleticHub Community?</h2>
        <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
          Whether you're looking to compete, organize, or just enjoy sports events, we've got you covered.
        </p>
        <Link to="/registration">
        <Button>
          Sign Up Now
        </Button>
        </Link>
      </section>
      </div>

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

        <section className="py-16 bg-base-200 text-center rounded-xl px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold text-primary mb-8 animate-pulse">
    💪 Training & Fitness Tips
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      {
        title: "Warm-Up Routines",
        description: "Start your day with the best warm-up routines to prevent injuries.",
        icon: <FaRunning className="text-5xl text-primary mb-2" />,
      },
      {
        title: "Nutrition Guide",
        description: "Eat smart and fuel your body for peak performance.",
        icon: <FaAppleAlt className="text-5xl text-primary mb-2" />,
      },
      {
        title: "Strength Training",
        description: "Build strength, endurance, and stamina with targeted exercises.",
        icon: <FaDumbbell className="text-5xl text-primary mb-2" />,
      },
    ].map((tip, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="bg-base-100 p-6 rounded-xl shadow hover:shadow-xl transition"
      >
        <div className="mb-2">{tip.icon}</div>
        <h3 className="text-lg font-semibold text-secondary-foreground mb-1">
          {tip.title}
        </h3>
        <p className="text-xs text-muted-foreground">{tip.description}</p>
      </motion.div>
    ))}
  </div>
        </section>

      <section className="py-16 bg-base-200 text-center px-4 sm:px-6 lg:px-8 rounded-xl">
  <h2 className="text-3xl font-bold text-primary mb-8 animate-pulse">
    📅 Upcoming Events
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {[
      {
        eventName: "Open Track and Field Day",
        eventDate: "August 30, 2025",
        location: "Open Field, WA",
        eventImage: "https://i.ibb.co/60XGShkF/opentrack.jpg",
        registrationFee: 20,
      },
      {
        eventName: "Urban Hurdle Challenge",
        eventDate: "September 10, 2025",
        location: "Metro Stadium, CA",
        eventImage: "https://i.ibb.co/YBCx2bm0/Urban-Hurdle.jpg",
        registrationFee: 28,
      },
      {
        eventName: "High Jump Elite Meet",
        eventDate: "August 12, 2025",
        location: "Summit Athletics Center",
        eventImage: "https://i.ibb.co/2XYsybk/high-Jump-Elite.jpg",
        registrationFee: 40,
      },
      {
        eventName: "Cycling Time Trials",
        eventDate: "September 5, 2025",
        location: "River Road Circuit, OR",
        eventImage: "https://i.ibb.co/q3gWrstw/cycle-trials.jpg",
        registrationFee: 27,
      },
    ].map((event, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="bg-base-100 rounded-xl overflow-hidden shadow hover:shadow-xl transition"
      >
        <img
          src={event.eventImage}
          alt={event.eventName}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-secondary-foreground mb-1">
            {event.eventName}
          </h3>
          <p className="text-xs text-muted-foreground mb-1">
            {event.eventDate} | {event.location}
          </p>
          <div className="text-sm text-primary font-medium">
            Registration Fee: ${event.registrationFee}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

<section className="py-16 bg-base-200 px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-primary">👥 Top Organizers</h2>
    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
      Meet the passionate organizers behind our most exciting events. Connect, follow, and join their upcoming competitions.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {topOrganizers.map((organizer, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="bg-muted rounded-xl p-6 flex flex-col items-center shadow hover:shadow-xl transition"
      >
        <img
          src={organizer.image}
          alt={organizer.name}
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h3 className="text-lg font-semibold text-primary">{organizer.name}</h3>
        <p className="text-sm text-accent-foreground mt-1">
          {organizer.eventsCount}+ events organized
        </p>
        <Link
          to={`/organizers/${organizer.id}`}
          className="mt-4 px-4 py-2 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition"
        >
          View Profile
        </Link>
      </motion.div>
    ))}
  </div>
</section>


         
      </div>
    </>
  );
};

export default Home;
