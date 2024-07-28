// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-green-400 via-purple-500 to-indigo-600">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0"
      >
        <source src="/galaxy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center p-10 bg-black bg-opacity-70 rounded-xl shadow-lg border-2 border-gradient-to-r from-green-400 to-purple-500">
        <h1 className="text-6xl font-extrabold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 animate-pulse">
          Welcome to <span className="text-yellow-400">TuneLink!</span>
        </h1>
        <p className="text-xl font-semibold mb-10 text-gray-300 drop-shadow-lg">
          Stream. Vibe. Chat.
        </p>
        <div className="flex flex-col space-y-4">
          <Link href="/login">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
