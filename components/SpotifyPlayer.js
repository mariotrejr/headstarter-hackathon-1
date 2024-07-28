// components/SpotifyPlayer.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyPlayer = ({ trackId }) => {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`,
          },
        });
        setTrack(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (trackId) {
      fetchTrack();
    }
  }, [trackId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!track) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <div className="flex items-center">
        <img src={track.album.images[0].url} alt={track.name} className="w-24 h-24 mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{track.name}</h2>
          <p>{track.artists.map(artist => artist.name).join(', ')}</p>
          <p>{track.album.name}</p>
          <audio controls className="mt-2">
            <source src={track.preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
