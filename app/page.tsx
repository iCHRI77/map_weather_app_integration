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
          the <a href="https://open-meteo.com/" target="_blank" className="text-cyan-500 underline">Open Meteo API</a> to get weather data with <a href="https://react-leaflet.js.org/" target="_blank" className="text-cyan-500 underline">React Leaftlet 5.x</a> for the map library, <a href="https://react-icons.github.io/react-icons/" target="_blank" className="text-cyan-500 underline">React Icons</a> library for the icons and some animations with <a href="https://motion.dev/" target="_blank" className="text-cyan-500 underline">Motion</a> library.
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
        {/* <iframe
          width={720}
          height={360}
          src="https://www.youtube.com/embed/ZjAqacIC_3c?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI"
          title="Next.js 14 Tutorial - 1 - Introduction"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen>
        </iframe> */}
        <div>
          <p><i>Video Here</i></p>
        </div>


      </motion.div>
    </div>
  );
}
