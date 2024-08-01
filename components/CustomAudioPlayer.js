import React from 'react';
import ReactPlayer from 'react-player';
import './CustomAudioPlayer.css'; // Import custom CSS for styling

const CustomAudioPlayer = ({ url }) => {
  return (
    <div className="custom-audio-player">
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="50px"
        className="audio-player"
      />
    </div>
  );
};

export default CustomAudioPlayer;
