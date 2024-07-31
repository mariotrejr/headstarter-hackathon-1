"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Ensure correct import
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Info:", userCredential.user);
      router.push("/dashboard");
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError("Oops! That doesn't look like a valid email. Please try again.");
          break;
        case 'auth/user-disabled':
          setError("It seems your account has been disabled. Please contact support.");
          break;
        case 'auth/user-not-found':
          setError("Hmm, we can't find an account with that email. Maybe sign up first?");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password, friend. Give it another go!");
          break;
        default:
          setError("Sorry friend, either your email or password is invalid. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
        {error && <p className="text-red-400 text-center mb-4 font-bold text-lg animate-pulse">{error}</p>}
        <form onSubmit={handleLogin}>
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
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link href="/" className="text-blue-400 hover:text-blue-600 text-sm">
              Go to Homepage
            </Link>
          </div>
          <div className="text-center mt-4">
            <Link href="/forgotpass" className="text-blue-400 hover:text-blue-600">
              Forgot Password?
            </Link>
            <p className="text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-400 hover:text-blue-600">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
