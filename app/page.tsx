'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Navbar from "./components/navbar";
import * as motion from "motion/react-client"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="pt-16 md:pt-20">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-md' : 'py-2 bg-gray-100 border-b-2 border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <Navbar className={isScrolled ? 'py-1' : 'py-2'} />
        </div>
      </header>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-28 bg-gray-100 pt-20 md:pt-24 pb-12 md:pb-20">
        <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/weather-bg.jpg" 
              alt="Weather background" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="text-center lg:text-left relative z-10 h-full flex flex-col items-center lg:items-start justify-center lg:justify-end p-6 sm:p-8 md:p-12">
            <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
              Your weather, instantly and accurately
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl my-3 sm:my-4 md:my-5 w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
              A desktop application that lets you check the weather in any city around the world.
            </p>
            <Link 
              href="/InAction" 
              className="text-white border font-bold border-blue-600 bg-blue-600 px-4 sm:px-5 py-2 rounded-md hover:bg-transparent hover:border-white transition-all duration-300 text-sm sm:text-base"
            >
              Check the weather now
            </Link>
          </div>
        </section>

      </div>

      <div className="bg-white py-10 px-3 lg:py-20 lg:px-28">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Main Features</h2>
          <p className="text-lg text-gray-600">Discover everything our application can do for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Data</h3>
            <p className="text-gray-600">Get accurate and up-to-date weather information instantly for any location in the world.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Extended Forecast</h3>
            <p className="text-gray-600">Plan your week with our 7-day forecast, including temperature, humidity, and more data.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Weather Alerts</h3>
            <p className="text-gray-600">Receive instant notifications about adverse weather conditions in your location.</p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-gray-50 py-10 lg:py-20 px-10 lg:px-28">
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it used to work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Watch how our application integrates multiple technologies to deliver real-time weather data with precision and style.</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-xl bg-white"
          >
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/iL2qBsmi3-g"
                title="Next.js - How I integrate Leaftlet 5.x with Open Meteo API and Open Street Map"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                This is an app developed in <a href="https://nextjs.org/" target="_blank" className="text-blue-600 hover:underline font-medium">Next.js</a> with
                API integrations. Here we are integrating the <a href="https://redux-toolkit.js.org/" target="_blank" className="text-blue-600 hover:underline font-medium">React Redux.js</a> library,
                the <a href="https://www.openstreetmap.org/" target="_blank" className="text-blue-600 hover:underline font-medium">Open Street Maps</a>, to get the Cities by lat and long atributes, the <a href="https://open-meteo.com/" target="_blank" className="text-blue-600 hover:underline font-medium">Open Meteo API</a> to get weather data with <a href="https://react-leaflet.js.org/" target="_blank" className="text-blue-600 hover:underline font-medium">React Leaftlet 5.x</a> for the map library, <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-blue-600 hover:underline font-medium">React Icons</a> library for the icons and some animations with <a href="https://motion.dev/" target="_blank" className="text-blue-600 hover:underline font-medium">Motion</a> library.
                For showing my skills integrating different libraries and doing interactive components, this is for you: Go to see it <Link href="/InAction" className="text-blue-600 hover:underline font-medium">In Action</Link>.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Weather App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
