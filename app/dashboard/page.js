// app/dashboard/page.js
"use client";

import { useState } from 'react';
import UserList from '../../components/UserList';
import Chat from '../components/Chat';

const Dashboard = () => {
  const [roomId] = useState('mainRoom'); // Define roomId in state

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: 'url(/drivein.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Sidebar for UserList */}
      <aside className="w-1/4 bg-gray-800 bg-opacity-70 p-4 text-white flex-shrink-0">
        <h2 className="text-xl font-semibold mb-4">Users in Room</h2>
        <UserList />
      </aside>
      
      {/* Main content area with Spotify embedding in the middle */}
      <main className="flex-grow bg-gray-900 bg-opacity-70 p-6 flex flex-col justify-start">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-4xl mb-4">
          <h3 className="text-xl font-semibold mb-4 text-white">Now Playing</h3>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/episode/28yVF79higtNvxJhLr4JKF?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
          ></iframe>
        </div>
      </main>

      {/* Sidebar for Chat */}
      <aside className="w-1/4 bg-gray-800 bg-opacity-70 p-4 text-white flex-shrink-0">
        <div className="h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Chat</h2>
          <div className="flex-grow bg-gray-700 rounded-lg shadow-lg p-4 overflow-auto">
            <Chat roomId={roomId} />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
