'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';

export default function DevsPage() {
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

  const developers = [
    {
      name: 'Christian Barbosa',
      role: 'Full Stack Developer',
      image: '/dev1.jpg', // Replace with actual image paths
      email: 'christianjbarbosab@gmail.com',
      linkedin: 'https://www.linkedin.com/in/christianbarbosa2711/',
      github: 'https://github.com/CJ2711'
    },
    {
      name: 'Christian Wilhelm',
      role: 'Full Stack Developer',
      image: '/dev2.jpg', // Replace with actual image paths
      email: 'wilhelmchristianj@gmail.com',
      linkedin: 'https://www.linkedin.com/in/christian-wilhelm-8071802b2/',
      github: 'https://github.com/christianjws24'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-md' : 'py-2 bg-gray-100 border-b-2 border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <Navbar className={isScrolled ? 'py-1' : 'py-2'} />
        </div>
      </header>
      
      <main className="flex-grow pt-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h1>
            <p className="text-xl text-gray-600">The talented developers behind this project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="p-8 flex-1 flex flex-col items-center">
                  {/* Profile Image */}
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100 mb-6">
                    <img 
                      src={dev.image} 
                      alt={dev.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dev.name)}&background=3b82f6&color=fff&size=200`;
                      }}
                    />
                  </div>
                  
                  {/* Name and Role */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">{dev.name}</h2>
                  <p className="text-blue-600 mb-6 text-center">{dev.role}</p>
                </div>
                
                {/* Social Icons - Full Width */}
                <div className="mt-auto bg-gray-50 py-6 w-full">
                  <div className="flex justify-center space-x-8">
                    <a 
                      href={`mailto:${dev.email}`} 
                      className="p-3 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 flex items-center justify-center hover:scale-110"
                      aria-label="Email"
                    >
                      <FaEnvelope className="w-7 h-7" />
                    </a>
                    <a 
                      href={dev.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 flex items-center justify-center hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-7 h-7" />
                    </a>
                    <a 
                      href={dev.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 flex items-center justify-center hover:scale-110"
                      aria-label="GitHub"
                    >
                      <FaGithub className="w-7 h-7" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 text-white py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Weather App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}