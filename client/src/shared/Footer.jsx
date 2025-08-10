import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Simple email validation
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Thank you for subscribing!");
    setEmail(""); // Clear input after submission
  };

  return (
    <div className=" my-3  shadow-md hover:shadow-sm transition-shadow mb-5">
      <footer className="bg-muted p-10 rounded-2xl">
        <div className="mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">
              Athletic<span className="text-gray-400">Hub</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
            Connecting athletes, fans, and sports enthusiasts through premier
            event bookings and community-driven competitions. Find, join, and
            celebrate sports near you.
          </p>

          {/* Email Subscription */}
          <div className="flex justify-center mb-10">
            <div className="flex w-full max-w-2xl text-black bg-white rounded-lg overflow-hidden border">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 text-black outline-none"
              />
              <div className="bg-white flex items-center px-4 border-l">
                <MdEmail className="text-gray-500" size={22} />
              </div>
              <Button
                className="px-6 py-6 cursor-pointer"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm font-semibold">
            <a
              href="/"
              className="hover:shadow-lg dark:shadow-gray-600 transition-shadow"
            >
              Home
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="/about"
              className="hover:shadow-lg dark:shadow-gray-600 transition-shadow"
            >
              About Us
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="/team"
              className="hover:shadow-lg dark:shadow-gray-600 transition-shadow"
            >
              Team
            </a>

            <span className="text-gray-500">|</span>
            <a
              href="/contact"
              className="hover:shadow-lg dark:shadow-gray-600 transition-shadow"
            >
              Contact
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="/faq"
              className="hover:shadow-lg dark:shadow-gray-600 transition-shadow"
            >
              Faq
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
