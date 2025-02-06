"use client";
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { RemovePlace } from '@/lib/slices/markersReducer';
import * as motion from "motion/react-client"


const Sidebar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const markers = useSelector((state: RootState) => state.markersMapList.markers);
    const dispatch = useDispatch();

    return (
        <div style={{ zIndex: 1000 }}>
            <aside className="hidden md:block bg-[#023E8A] h-screen w-64 p-4 text-white">
                <h2 className="text-xl font-bold mb-4">My Sites</h2>
                {
                    (markers.length === 0) ? <div className="text-center text-white">No markers added</div>
                        :
                        (
                            markers.map((place, index) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                                    }} key={index} className="flex items-center justify-between bg-blue-600 p-2 rounded my-4">
                                    <span>{place.name}</span>
                                    <span>{place.weather}</span>
                                    <span>{place.temperature}°C</span>
                                    <span style={{ color: 'red', cursor: 'pointer', padding: '2px' }}
                                        onClick={() =>
                                            dispatch(
                                                RemovePlace(index)
                                            )
                                        }
                                    ><MdDeleteForever /></span>
                                </motion.div>
                            ))
                        )
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
                            {
                                (markers.length === 0) ? <div className="text-center text-white">No markers added</div>
                                    :
                                    (
                                        markers.map((place, index) => (
                                            <div key={index} className="flex items-center justify-between bg-blue-600 p-2 rounded gap-2">
                                                <span>{place.name}</span>
                                                <span>{place.weather}</span>
                                                <span>{place.temperature}°C</span>
                                                <span style={{ color: 'red', cursor: 'pointer', padding: '2px' }}
                                                    onClick={() => dispatch({ type: 'REMOVE_MARKER', payload: index })}
                                                ><MdDeleteForever /></span>

                                            </div>
                                        ))
                                    )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;