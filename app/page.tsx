import Link from "next/link";
import Navbar from "./components/navbar";
import * as motion from "motion/react-client"


export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto">
        <h1 className="mt-10 text-center font-bold text-2xl">
          Map + Weather Example App
        </h1>

        <p className="mt-5 text-justify w-1/2 mx-auto">
          This is an app developed in <a href="https://nextjs.org/" target="_blank" className="text-cyan-500 underline">Next.js</a> with
          API integrations. Here we are integrating the <a href="https://redux-toolkit.js.org/" target="_blank" className="text-cyan-500 underline">React Redux.js</a> library,
          the <a href="https://www.openstreetmap.org/" target="_blank" className="text-cyan-500 underline">Open Street Maps</a>, to get the Cities by lat and long atributes, the <a href="https://open-meteo.com/" target="_blank" className="text-cyan-500 underline">Open Meteo API</a> to get weather data with <a href="https://react-leaflet.js.org/" target="_blank" className="text-cyan-500 underline">React Leaftlet 5.x</a> for the map library, <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-cyan-500 underline">React Icons</a> library for the icons and some animations with <a href="https://motion.dev/" target="_blank" className="text-cyan-500 underline">Motion</a> library.
          For showing my skills integrating different libraries and doing interactive components, this is for you: Go to see it <Link href="/InAction" className="text-red-600 underline">In Action</Link>.
        </p>
      </section>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className="relative mt-5 justify-self-center overflow-hidden"
      >
        <div style={{paddingBottom:'50px'}}>
          <iframe
            width={720}
            height={360}
            src="https://www.youtube.com/embed/iL2qBsmi3-g" title="Next.js - How I integrate Leaftlet 5.x with Open Meteo API and Open Street Map"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </div>
      </motion.div>
    </div>
  );
}
