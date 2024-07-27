// app/dashboard/page.js
"use client";

import { useState } from "react";

const mockUsers = [
  { id: 1, name: "User1", avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "User2", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "User3", avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "User4", avatar: "https://via.placeholder.com/40" },
];

const mockSongs = [
  { id: 1, title: "Song1 by Artist1", url: "https://open.spotify.com/embed/track/7lEptt4wbM0yJTvSG5EBof" },
  { id: 2, title: "Song2 by Artist2", url: "https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b" },
  { id: 3, title: "Song3 by Artist3", url: "https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC" },
];

export default function Dashboard() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);

  const handleSongChange = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold mb-4">Listening Party</h1>
        <p className="text-xl">Enjoy music together with friends!</p>
      </div>

      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <iframe
          src={currentSong.url}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
          className="rounded mb-4"
        ></iframe>
        <div className="flex justify-around">
          {mockSongs.map((song) => (
            <button
              key={song.id}
              onClick={() => handleSongChange(song)}
              className={`py-2 px-4 rounded font-bold ${
                currentSong.id === song.id ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
              } transition duration-300 ease-in-out transform hover:scale-105`}
            >
              {song.title}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold mb-4">Currently Listening</h2>
        <div className="flex flex-wrap">
          {mockUsers.map((user) => (
            <div key={user.id} className="flex items-center mr-4 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-3 border-2 border-gray-700"
              />
              <span className="text-lg">{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
