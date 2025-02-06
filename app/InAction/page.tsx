import Map from "../components/map"
import Sidebar from "../components/sidebar"
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
