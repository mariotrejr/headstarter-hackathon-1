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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await joinRoom(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
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
        </form>
      )}
    </div>
  );
};

export default Login;
