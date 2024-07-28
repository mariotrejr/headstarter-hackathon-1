// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center p-10 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to Virtual Concert Platform</h1>
        <p className="text-lg mb-8 text-gray-700">Experience live performances like never before!</p>
        <div className="space-x-4">
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
