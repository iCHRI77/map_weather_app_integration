"use client";
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';


const Sidebar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const markers = useSelector((state: RootState) => state.markersMapList.markers);
    const dispatch = useDispatch();

    return (
        <div style={{ zIndex: 1000 }}>
            <aside className="hidden md:block bg-[#023E8A] h-screen w-64 p-4 text-white">
                <h2 className="text-xl font-bold mb-4">My Sites</h2>
                {
                    markers.map((place, index) => (
                        <div key={index} className="flex items-center justify-between bg-blue-600 p-2 rounded">
                            <span>{place.name}</span>
                            <span>{place.weather}</span>
                            <span>{place.temperature}°C</span>
                        </div>
                    ))
                }
            </aside>


            <div className="md:hidden flex items-center justify-between p-4 bg-blue-500 text-white rounded-md">
                <button onClick={() => setMobileMenuOpen(true)}>
                    <FaBars size={24} />
                </button>
            </div>


            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-blue-500 text-white p-6 rounded shadow-lg w-3/4">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <FaTimes size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-blue-600 p-2 rounded">
                                <span>Place_01</span>
                                <span>Lluvia 20°C</span>
                            </div>
                            <div className="flex items-center justify-between bg-blue-600 p-2 rounded">
                                <span>Place_02</span>
                                <span>Sol 30°C</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;