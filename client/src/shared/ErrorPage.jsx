// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
        {/* Illustration */}
        <div
          aria-hidden="true"
          className="flex-shrink-0 w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-72 h-72 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#e9f2ff] to-white p-6">
            {/* floating circles */}
            <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full opacity-30 animate-slow-pulse bg-[#dbeeff]"></div>
            <div className="absolute right-4 top-6 w-20 h-20 rounded-full opacity-20 bg-[#cfe6ff]"></div>

            {/* Main SVG / mascot */}
            <svg
              viewBox="0 0 240 240"
              className="relative w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#9fd1ff" />
                  <stop offset="1" stopColor="#d0e9ff" />
                </linearGradient>
              </defs>

              <rect
                x="12"
                y="12"
                width="216"
                height="216"
                rx="28"
                fill="url(#g)"
              />
              <g transform="translate(40,48)">
                <circle cx="80" cy="48" r="38" fill="white" opacity="0.95" />
                <path
                  d="M50 84 q30 24 60 0"
                  fill="none"
                  stroke="#0057b8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="64" cy="40" r="6" fill="#0057b8" />
                <circle cx="96" cy="40" r="6" fill="#0057b8" />
              </g>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl font-extrabold text-[#0057b8] leading-tight">
            404
          </h1>
          <p className="mt-2 text-xl font-semibold text-slate-700">
            Oops — page not found.
          </p>

          <p className="mt-4 text-slate-600">
            The page you’re looking for doesn’t exist or has been moved. Try
            returning to the homepage or checking the URL.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:justify-start gap-3 items-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 bg-primary text-secondary font-medium shadow hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-[#0057b8]/40"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            If you think this is an error, contact support or try refreshing.
          </p>
        </div>
      </div>

      {/* small style & animation helpers */}
      <style>{`
        /* gentle float for background circles */
        @keyframes slowPulse {
          0% { transform: translateY(0) scale(1); opacity: .28; }
          50% { transform: translateY(-6px) scale(1.02); opacity: .34; }
          100% { transform: translateY(0) scale(1); opacity: .28; }
        }
        .animate-slow-pulse {
          animation: slowPulse 4.5s ease-in-out infinite;
        }

        /* responsive tweak */
        @media (max-width: 640px) {
          .text-6xl { font-size: 3.5rem; }
        }
      `}</style>
    </div>
  );
}
