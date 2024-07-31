"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setMessage("Invalid email format. Please enter a valid email.");
          break;
        case 'auth/user-not-found':
          setMessage("No account found with that email. Please check the email and try again.");
          break;
        default:
          setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Forgot Password</h2>
        {message && (
          <p className={`text-center mb-4 font-bold text-lg animate-pulse ${message.includes("sent") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handlePasswordReset}>
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
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400">
              Remember your password?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-600">
                Log In
              </Link>
            </p>
            <p className="text-gray-400 mt-4">
              <Link href="/" className="text-blue-400 hover:text-blue-600">
                Go to Homepage
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
