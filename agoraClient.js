import { createClient, createScreenVideoTrack } from 'agora-rtc-sdk-ng';

let client;
let isClientInitialized = false;

const initAgoraClient = async (appId, channel, token) => {
  client = createClient({ mode: 'rtc', codec: 'vp8' });

  client.on('user-published', async (user, mediaType) => {
    await handleUserPublished(user, mediaType);
  });

  client.on('user-unpublished', handleUserUnpublished);

  try {
    await client.join(appId, channel, token, null);
    console.log('Successfully joined the Agora channel');
    isClientInitialized = true;
  } catch (error) {
    console.error('Error joining Agora channel:', error);
  }

  return client;
};

const handleUserPublished = async (user, mediaType) => {
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
};

const handleUserUnpublished = (user) => {
  console.log('User unpublished:', user.uid);
  const remoteVideoContainer = document.getElementById(`remote-user-${user.uid}`);
  if (remoteVideoContainer) {
    remoteVideoContainer.remove();
  }
};

const startScreenSharing = async (videoElementId) => {
  if (!isClientInitialized) {
    console.error('Agora client is not initialized');
    return;
  }

  try {
    const [localScreenTrack] = await createScreenVideoTrack({ encoderConfig: '1080p_1' });
    await client.publish(localScreenTrack);
    localScreenTrack.play(videoElementId, { fit: 'contain' });
    console.log('Screen sharing started and track is playing in element:', videoElementId);
  } catch (error) {
    console.error('Error publishing screen track:', error);
  }
};

const stopScreenSharing = async () => {
  if (!isClientInitialized) {
    console.error('Agora client is not initialized');
    return;
  }

  try {
    await client.unpublish(client.localTracks.filter(track => track.trackId.includes('scr')));
    console.log('Screen sharing stopped');
  } catch (error) {
    console.error('Error stopping screen sharing:', error);
  }
};

export { initAgoraClient, startScreenSharing, stopScreenSharing };


//65f5d5d8718244e6acec2f20a19b2278