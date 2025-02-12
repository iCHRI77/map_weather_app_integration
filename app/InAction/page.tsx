"use client"
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./map'), { ssr: false });


// import Map from "./map"
import Sidebar from "./sidebar"
import Navbar from "../components/navbar";
import StoreProvider from "@/lib/StoreProvider";


export default function InAction() {
    return (
        <StoreProvider>
            <Navbar />
            <div className="flex flex-row-2">
                <Sidebar />
                <Map />
            </div>
        </StoreProvider>
    )
}
