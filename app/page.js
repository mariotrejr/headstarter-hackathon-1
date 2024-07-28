// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/kku.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 text-center p-10 bg-black bg-opacity-60 rounded-lg shadow-lg border-4 border-yellow-500">
        <h1 className="text-5xl font-bold mb-6 text-yellow-300">Welcome to Tune Link</h1>
        <p className="text-2xl font-semibold mb-8 text-gray-300">Experience podcasts like never before!</p>
        <div className="space-x-4">
          <Link href="/login">
            <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}





