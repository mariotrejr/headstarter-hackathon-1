<<<<<<< HEAD
// pages/login.js or app/login/page.js (depending on your project structure)
"use client"
import { useState } from 'react';
import { auth, db } from '../../firebase'; // Adjusted path
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
=======
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Ensure correct import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
>>>>>>> b069ff029c89acc26f75679e5e94a17cd06f38d7

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
<<<<<<< HEAD
      const user = userCredential.user;
      await joinRoom(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
=======
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
>>>>>>> b069ff029c89acc26f75679e5e94a17cd06f38d7
    }
  };

  const joinRoom = async (user) => {
    const roomId = 'mainRoom';
    const roomRef = doc(db, 'rooms', roomId);

    await updateDoc(roomRef, {
      users: arrayUnion({
        uid: user.uid,
        displayName: user.displayName || user.email,
        email: user.email
      })
    });
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <Link href="/dashboard">
    
        </Link>
      ) : (
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
=======
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-700 text-center mb-4 font-bold text-lg animate-pulse">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="text-center mt-4">
            <a
              href="/forgotpass"
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot Password?
            </a>
          </div>
>>>>>>> b069ff029c89acc26f75679e5e94a17cd06f38d7
        </form>
      )}
    </div>
  );
};

export default Login;
