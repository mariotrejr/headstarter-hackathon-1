import { useEffect, useState } from 'react';
import { initAgoraClient, startScreenSharing, stopScreenSharing } from '../agoraClient';

const ScreenSharing = () => {
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const appId = 'YOUR_AGORA_APP_ID';
        const channel = 'mainRoom';
        const token = 'YOUR_AGORA_TOKEN';
        await initAgoraClient(appId, channel, token);
        console.log('Agora client initialized');
      } catch (error) {
        console.error('Error initializing Agora client:', error);
      }
    };
    initialize();
  }, []);

  const handleScreenShare = async () => {
    if (!isSharing) {
      try {
        console.log('Attempting to start screen sharing');
        await startScreenSharing('local-screen-share-video'); // Use a unique ID for the local video element
        setIsSharing(true);
      } catch (error) {
        console.error('Error starting screen sharing:', error);
      }
    } else {
      try {
        await stopScreenSharing();
        setIsSharing(false);
      } catch (error) {
        console.error('Error stopping screen sharing:', error);
      }
    }
  };

  return (
    <div className="screen-sharing-container">
      <button
        onClick={handleScreenShare}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isSharing ? 'Stop Sharing' : 'Share Screen'}
      </button>
      <div className="screen-share-viewer">
        <div id="local-screen-share-video" style={{ width: '100%', height: '100%', backgroundColor: 'black' }}></div>
        <div id="remote-screen-share-container" style={{ width: '100%', height: '100%', backgroundColor: 'black' }}></div>
      </div>
    </div>
  );
};

export default ScreenSharing;
