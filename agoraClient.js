let client;
let isClientInitialized = false;

const initAgoraClient = async () => {
  if (typeof window !== 'undefined') {
    const AgoraRTC = await import('agora-rtc-sdk-ng');
    client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    client.on('user-published', async (user, mediaType) => {
      try {
        console.log('User published:', user.uid, 'Media type:', mediaType);
        await client.subscribe(user, mediaType);
        console.log('Subscribed to user:', user.uid);

        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack;
          const remoteVideoContainer = document.createElement('div');
          remoteVideoContainer.id = `remote-user-${user.uid}`;
          remoteVideoContainer.style.width = '100%';
          remoteVideoContainer.style.height = '100%';
          document.getElementById('remote-screen-share-container').appendChild(remoteVideoContainer);
          remoteVideoTrack.play(remoteVideoContainer.id);
        }

        if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play();
        }
      } catch (error) {
        console.error('Failed to subscribe to user:', error);
      }
    });

    client.on('user-unpublished', user => {
      console.log('User unpublished:', user.uid);
      const remoteVideoContainer = document.getElementById(`remote-user-${user.uid}`);
      if (remoteVideoContainer) {
        remoteVideoContainer.remove();
      }
    });

    try {
      await client.join('65f5d5d8718244e6acec2f20a19b2278', 'mainRoom', null, null);
      console.log('Successfully joined the Agora channel');
      isClientInitialized = true;
    } catch (error) {
      console.error('Error joining Agora channel:', error);
    }
  }
  return client;
};

const startScreenSharing = async (videoElementId) => {
  if (typeof window !== 'undefined') {
    if (!isClientInitialized) {
      console.error('Agora client is not initialized');
      return;
    }

    const AgoraRTC = await import('agora-rtc-sdk-ng');
    const localScreenTrack = await AgoraRTC.createScreenVideoTrack({
      encoderConfig: '1080p_1',
    });

    if (client) {
      try {
        await client.publish(localScreenTrack);
        localScreenTrack.play(videoElementId, { fit: 'contain' });
        console.log('Screen sharing started and track is playing in element:', videoElementId);
      } catch (error) {
        console.error('Error publishing screen track:', error);
      }
    } else {
      console.error('Agora client is not initialized');
    }
  }
};

const stopScreenSharing = async () => {
  if (typeof window !== 'undefined') {
    // Logic to stop screen sharing can be added here
    console.log('Screen sharing stopped');
  }
};

export { initAgoraClient, startScreenSharing, stopScreenSharing };


//65f5d5d8718244e6acec2f20a19b2278