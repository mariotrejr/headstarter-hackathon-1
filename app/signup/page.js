'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError("Oops! This email is already in use. Try logging in or use another email.");
          break;
        case 'auth/invalid-email':
          setError("Please enter a valid email address.");
          break;
        case 'auth/weak-password':
          setError("Your password is too weak. Make sure it's at least 6 characters long.");
          break;
        default:
          setError("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-800 via-purple-900 to-black">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>
        {error && <p className="text-red-400 text-center mb-4 font-bold text-lg animate-pulse">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400 mb-4">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-600">
                Log In
              </Link>
            </p>
            <Link href="/" className="text-blue-400 hover:text-blue-600">
              Go to Homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
