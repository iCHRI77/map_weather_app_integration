"use client";
import React, { useState, useCallback } from 'react';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { MdDeleteForever } from "react-icons/md";
import { WiSunrise, WiMoonAltWaningCrescent4 } from 'react-icons/wi';
import ConfirmationModal from '../components/ConfirmationModal';
import { useMarkersStore } from '@/lib/markersStore';
import * as motion from "motion/react-client";
import SearchBar from '../components/SearchBar';

interface SidebarProps {
    onSearch: (query: string, lat?: number, lon?: number) => void;
}

const Sidebar = ({ onSearch }: SidebarProps) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const { markers, removePlace } = useMarkersStore();

    const handleDeleteClick = (index: number) => {
        setSelectedIndex(index);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedIndex !== null) {
            removePlace(selectedIndex);
            setShowDeleteModal(false);
            setSelectedIndex(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedIndex(null);
    };

    const handleSearch = useCallback(() => {
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    }, [searchQuery, onSearch]);

    const handleFavoriteClick = (place: any) => {
        if (place.lat && place.lon) {
            onSearch(place.name, place.lat, place.lon);
        } else {
            onSearch(place.name);
        }
    };

    return (
        <div style={{ zIndex: 1020, backgroundColor: 'white' }}>
            <aside className="hidden md:flex flex-col h-screen w-80 p-4 text-gray-800 overflow-y-auto border-r border-gray-200">
                {/* Logo and Home Link */}
                <Link href="/" className="flex items-center mb-6">
                    <Image
                        src="/WeatherMapAppLogo.png"
                        alt="Weather Map App"
                        width={40}
                        height={40}
                        className="mr-2"
                    />
                </Link>

                <div className="mb-6 rounded-lg">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSearch={handleSearch}
                    />
                </div>
                <h2 className="text-xl font-bold mb-4 px-2">Favorite locations</h2>
                <div className="flex-1 overflow-y-auto p-4 rounded-lg mb-4">
                    {
                        (markers.length === 0) ? (
                            <div className="text-center text-gray-500 py-4">No favorites added yet</div>
                        ) : (
                            <div className="space-y-3">
                                {markers.map((place, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow transition-shadow w-full"
                                    >
                                        <div 
                                            className="flex items-center w-full cursor-pointer"
                                            onClick={() => handleFavoriteClick(place)}
                                        >
                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(index);
                                                }}
                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors mr-3"
                                                aria-label="Remove from favorites"
                                            >
                                                <MdDeleteForever className="text-xl" />
                                            </button>

                                            {/* Location Info */}
                                            <div className="w-3 flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 truncate w-3/4">
                                                    {place.name}
                                                </h3>
                                                {place.country && (
                                                    <p className="text-xs text-gray-500">
                                                        {place.country}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Temperature */}
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-gray-800">
                                                {place.temperature}°C
                                            </div>
                                            {place.temperatureMin !== undefined && place.temperatureMax !== undefined && (
                                                <div className="text-xs text-gray-500">
                                                    {Math.round(place.temperatureMin)}° / {Math.round(place.temperatureMax)}°
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )
                    }
                </div>

                {/* Separator and Home Button */}
                <div className="mt-auto">
                    <div className="border-t border-gray-200 my-4"></div>
                    <Link
                        href="/"
                        className="flex items-center w-full py-2 px-4 text-gray-600 rounded-lg transition-colors hover:bg-gray-200"
                    >
                        <FaHome className="mr-2" />
                        Back to Home
                    </Link>
                </div>
            </aside>


            <div className="md:hidden flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
                <Link href="/" className="flex items-center mr-4">
                    <Image
                        src="/WeatherMapAppLogo.png"
                        alt="Weather Map App"
                        width={32}
                        height={32}
                    />
                </Link>
                <div className="flex-1 mr-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSearch={handleSearch}
                        placeholder="Search location..."
                    />
                </div>
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 hover:bg-blue-700 rounded-md"
                >
                    <FaBars size={24} />
                </button>
            </div>


            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-blue-500 text-white p-6 rounded shadow-lg w-3/4 overflow-y-auto max-h-screen">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <FaTimes size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="mb-4">
                                <SearchBar
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    onSearch={handleSearch}
                                    placeholder="Search location..."
                                />
                            </div>
                            <h2 className="text-xl font-bold mb-4">My Sites</h2>
                            {
                                (markers.length === 0) ? <div className="text-center text-white">No markers added</div>
                                    :
                                    (
                                        markers.map((place, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 rounded gap-2">
                                                <span>{place.name}</span>
                                                <span>{place.weather}</span>
                                                <span>{place.temperature}°C</span>
                                                <span style={{ color: 'red', cursor: 'pointer', padding: '2px' }}
                                                    onClick={() => removePlace(index)}
                                                ><MdDeleteForever /></span>

                                            </div>
                                        ))
                                    )
                            }
                        </div>
                    </div>
                </div>
            )}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                message="¿Estás seguro de que quieres eliminar esta ubicación de favoritos?"
            />
        </div>
    );
};

export default Sidebar;